// @ts-nocheck
import { findDOMNode } from 'react-dom'

const defaultProps = {
	copyStyles: true,
	pageStyle: '@page { size: auto;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }', // remove date/time from top
	removeAfterPrint: false,
	suppressErrors: false,
}
const printWithBrowser = ({ bodyClass, content, copyStyles, fonts, pageStyle, nonce } = defaultProps) => {
	const contentEl = content

	const logMessages = (messages, level = 'error') => {
		if (level === 'error') {
			console.error(messages) // eslint-disable-line no-console
		} else if (level === 'warning') {
			console.warn(messages) // eslint-disable-line no-console
		}
	}

	if (contentEl === undefined) {
		logMessages([
			'To print a functional component ensure it is wrapped with `React.forwardRef`, and ensure the forwarded ref is used. See the README for an example: https://github.com/gregnb/react-to-print#examples',
		]) // eslint-disable-line max-len
		return
	}

	if (contentEl === null) {
		logMessages(['There is nothing to print because the "content" prop returned "null". Please ensure "content" is renderable before allowing "react-to-print" to be called.']) // eslint-disable-line max-len
		return
	}

	const printWindow = document.createElement('iframe')
	printWindow.style.position = 'absolute'
	printWindow.style.top = '-1000px'
	printWindow.style.left = '-1000px'
	printWindow.id = 'printWindow'
	// Ensure we set a DOCTYPE on the iframe's document
	// https://github.com/gregnb/react-to-print/issues/459
	printWindow.srcdoc = '<!DOCTYPE html>'

	const contentNodes = findDOMNode(contentEl)
	// React components can return a bare string as a valid JSX response
	const clonedContentNodes = contentNodes.cloneNode(true)
	const isText = clonedContentNodes instanceof Text

	const globalStyleLinkNodes = document.querySelectorAll("link[rel='stylesheet']")
	const renderComponentImgNodes = isText ? [] : clonedContentNodes.querySelectorAll('img')
	const renderComponentVideoNodes = isText ? [] : clonedContentNodes.querySelectorAll('video')

	let linkTotal = globalStyleLinkNodes.length + renderComponentImgNodes.length + renderComponentVideoNodes.length
	let linksLoaded = []
	let linksErrored = []
	let fontsLoaded = []
	let fontsErrored = []
	const triggerPrint = target => {
		startPrint(target)
	}
	const startPrint = target => {
		target.contentWindow.print()
	}
	const markLoaded = (linkNode, loaded) => {
		if (loaded) {
			linksLoaded.push(linkNode)
		} else {
			logMessages(['"react-to-print" was unable to load a linked node. It may be invalid. "react-to-print" will continue attempting to print the page. The linked node that errored was:', linkNode]) // eslint-disable-line max-len
			linksErrored.push(linkNode)
		}

		// We may have errors, but attempt to print anyways - maybe they are trivial and the
		// user will be ok ignoring them
		const numResourcesManaged = linksLoaded.length + linksErrored.length + fontsLoaded.length + fontsErrored.length

		if (numResourcesManaged === linkTotal) {
			triggerPrint(printWindow)
		}
	}

	printWindow.onload = () => {
		// Some agents, such as IE11 and Enzyme (as of 2 Jun 2020) continuously call the
		// `onload` callback. This ensures that it is only called once.
		printWindow.onload = null

		const domDoc = printWindow.contentDocument || printWindow.contentWindow?.document

		if (domDoc) {
			domDoc.body.appendChild(clonedContentNodes)

			if (fonts) {
				// @ts-ignore
				if (printWindow.contentDocument?.fonts && printWindow.contentWindow?.FontFace) {
					fonts.forEach(font => {
						const fontFace = new FontFace(font.family, font.source)
						printWindow.contentDocument.fonts.add(fontFace)
						fontFace.loaded
							.then(loadedFontFace => {
								fontsLoaded.push(loadedFontFace)
							})
							.catch(error => {
								fontsErrored.push(fontFace)
								logMessages([
									'"react-to-print" was unable to load a font. "react-to-print" will continue attempting to print the page. The font that failed to load is:',
									fontFace,
									'The error from loading the font is:',
									error,
								]) // eslint-disable-line max-len
							})
					})
				} else {
					logMessages(['"react-to-print" is not able to load custom fonts because the browser does not support the FontFace API']) // eslint-disable-line max-len
				}
			}

			const defaultPageStyle = typeof pageStyle === 'function' ? pageStyle() : pageStyle

			if (typeof defaultPageStyle !== 'string') {
				logMessages([`"react-to-print" expected a "string" from \`pageStyle\` but received "${typeof defaultPageStyle}". Styles from \`pageStyle\` will not be applied.`]) // eslint-disable-line max-len
			} else {
				const styleEl = domDoc.createElement('style')
				if (nonce) {
					styleEl.setAttribute('nonce', nonce)
					domDoc.head.setAttribute('nonce', nonce)
				}
				styleEl.appendChild(domDoc.createTextNode(defaultPageStyle))
				domDoc.head.appendChild(styleEl)
			}

			if (bodyClass) {
				domDoc.body.classList.add(...bodyClass.split(' '))
			}

			if (!isText) {
				// Copy canvases
				// NOTE: must use data from `contentNodes` here as the canvass elements in
				// `clonedContentNodes` will not have been redrawn properly yet
				const srcCanvasEls = isText ? [] : contentNodes.querySelectorAll('canvas')
				const targetCanvasEls = domDoc.querySelectorAll('canvas')

				for (let i = 0; i < srcCanvasEls.length; ++i) {
					const sourceCanvas = srcCanvasEls[i]

					const targetCanvas = targetCanvasEls[i]
					const targetCanvasContext = targetCanvas.getContext('2d')

					if (targetCanvasContext) {
						targetCanvasContext.drawImage(sourceCanvas, 0, 0)
					}
				}

				// Pre-load images
				for (let i = 0; i < renderComponentImgNodes.length; i++) {
					const imgNode = renderComponentImgNodes[i]
					const imgSrc = imgNode.getAttribute('src')

					if (!imgSrc) {
						logMessages(['"react-to-print" encountered an <img> tag with an empty "src" attribute. It will not attempt to pre-load it. The <img> is:', imgNode], 'warning') // eslint-disable-line
						markLoaded(imgNode, false)
					} else {
						// https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
						const img = new Image()
						img.onload = markLoaded.bind(null, imgNode, true)
						img.onerror = markLoaded.bind(null, imgNode, false)
						img.src = imgSrc
					}
				}

				// Pre-load videos
				for (let i = 0; i < renderComponentVideoNodes.length; i++) {
					const videoNode = renderComponentVideoNodes[i]
					videoNode.preload = 'auto' // Hint to the browser that it should load this resource

					const videoPoster = videoNode.getAttribute('poster')
					if (videoPoster) {
						// If the video has a poster, pre-load the poster image
						// https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
						const img = new Image()
						img.onload = markLoaded.bind(null, videoNode, true)
						img.onerror = markLoaded.bind(null, videoNode, false)
						img.src = videoPoster
					} else {
						if (videoNode.readyState >= 2) {
							// Check if the video has already loaded a frame
							markLoaded(videoNode, true)
						} else {
							videoNode.onloadeddata = markLoaded.bind(null, videoNode, true)

							// TODO: if one if these is called is it possible for another to be called? If so we
							// need to add guards to ensure `markLoaded` is only called once for the node
							// TODO: why do `onabort` and `onstalled` seem to fire all the time even if
							// there is no issue?
							// videoNode.onabort = () => { console.log('Video with no poster abort'); markLoaded.bind(null, videoNode, false)(); }
							videoNode.onerror = markLoaded.bind(null, videoNode, false)
							// videoNode.onemptied = () => { console.log('Video with no poster emptied'); markLoaded.bind(null, videoNode, false)(); }
							videoNode.onstalled = markLoaded.bind(null, videoNode, false)
						}
					}
				}

				// Copy input values
				// This covers most input types, though some need additional work (further down)
				const inputSelector = 'input'
				const originalInputs = contentNodes.querySelectorAll(inputSelector) // eslint-disable-line max-len
				const copiedInputs = domDoc.querySelectorAll(inputSelector)
				for (let i = 0; i < originalInputs.length; i++) {
					copiedInputs[i].value = originalInputs[i].value
				}

				// Copy checkbox, radio checks
				const checkedSelector = 'input[type=checkbox],input[type=radio]'
				const originalCRs = contentNodes.querySelectorAll(checkedSelector) // eslint-disable-line max-len
				const copiedCRs = domDoc.querySelectorAll(checkedSelector)
				for (let i = 0; i < originalCRs.length; i++) {
					copiedCRs[i].checked = originalCRs[i].checked
				}

				// Copy select states
				const selectSelector = 'select'
				const originalSelects = contentNodes.querySelectorAll(selectSelector) // eslint-disable-line max-len
				const copiedSelects = domDoc.querySelectorAll(selectSelector)
				for (let i = 0; i < originalSelects.length; i++) {
					copiedSelects[i].value = originalSelects[i].value
				}
			}

			if (copyStyles) {
				const headEls = document.querySelectorAll("style, link[rel='stylesheet']")
				for (let i = 0, headElsLen = headEls.length; i < headElsLen; ++i) {
					const node = headEls[i]
					if (node.tagName === 'STYLE') {
						// <style> nodes
						const newHeadEl = domDoc.createElement(node.tagName)
						const sheet = node.sheet
						if (sheet) {
							let styleCSS = ''
							// NOTE: for-of is not supported by IE
							try {
								// Accessing `sheet.cssRules` on cross-origin sheets can throw
								// security exceptions in some browsers, notably Firefox
								// https://github.com/gregnb/react-to-print/issues/429
								const cssLength = sheet.cssRules.length
								for (let j = 0; j < cssLength; ++j) {
									if (typeof sheet.cssRules[j].cssText === 'string') {
										styleCSS += `${sheet.cssRules[j].cssText}\r\n`
									}
								}
							} catch (error) {
								logMessages(
									[
										`A stylesheet could not be accessed. This is likely due to the stylesheet having cross-origin imports, and many browsers block script access to cross-origin stylesheets. See https://github.com/gregnb/react-to-print/issues/429 for details. You may be able to load the sheet by both marking the stylesheet with the cross \`crossorigin\` attribute, and setting the \`Access-Control-Allow-Origin\` header on the server serving the stylesheet. Alternatively, host the stylesheet on your domain to avoid this issue entirely.`,
										node,
									],
									'warning'
								)
							}

							newHeadEl.setAttribute('id', `react-to-print-${i}`)
							if (nonce) {
								newHeadEl.setAttribute('nonce', nonce)
							}
							newHeadEl.appendChild(domDoc.createTextNode(styleCSS))
							domDoc.head.appendChild(newHeadEl)
						}
					} else {
						// <link> nodes, and any others
						// Many browsers will do all sorts of weird things if they encounter an
						// empty `href` tag (which is invalid HTML). Some will attempt to load
						// the current page. Some will attempt to load the page"s parent
						// directory. These problems can cause `react-to-print` to stop without
						// any error being thrown. To avoid such problems we simply do not
						// attempt to load these links.
						if (node.getAttribute('href')) {
							const newHeadEl = domDoc.createElement(node.tagName)

							// Manually re-create the node
							// TODO: document why cloning the node won't work? I don't recall
							// the reasoning behind why we do it this way
							// NOTE: node.attributes has NamedNodeMap type that is not an Array
							// and can be iterated only via direct [i] access
							for (let j = 0, attrLen = node.attributes.length; j < attrLen; ++j) {
								// eslint-disable-line max-len
								const attr = node.attributes[j]
								if (attr) {
									newHeadEl.setAttribute(attr.nodeName, attr.nodeValue || '')
								}
							}

							newHeadEl.onload = markLoaded.bind(null, newHeadEl, true)
							newHeadEl.onerror = markLoaded.bind(null, newHeadEl, false)
							if (nonce) {
								newHeadEl.setAttribute('nonce', nonce)
							}
							domDoc.head.appendChild(newHeadEl)
						} else {
							logMessages(
								[
									'"react-to-print" encountered a <link> tag with an empty "href" attribute. In addition to being invalid HTML, this can cause problems in many browsers, and so the <link> was not loaded. The <link> is:',
									node,
								],
								'warning'
							)
							// `true` because we"ve already shown a warning for this
							markLoaded(node, true)
						}
					}
				}
			}
		}

		if (linkTotal === 0 || !copyStyles) {
			triggerPrint(printWindow)
		}
	}
	const handleRemoveIframe = force => {
		if (force) {
			// The user may have removed the iframe in `onAfterPrint`
			const documentPrintWindow = document.getElementById('printWindow')
			if (documentPrintWindow) {
				document.body.removeChild(documentPrintWindow)
			}
		}
	}

	handleRemoveIframe(true)
	document.body.appendChild(printWindow)
}
export default printWithBrowser

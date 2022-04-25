export function wait(ms = 500) {
	return new Promise((resolve, reject) => setTimeout(reject, ms))
}

export function download(link: string, name: string) {
	if (!name) {
		name = link.slice(link.lastIndexOf('/') + 1)
	}
	let eleLink = document.createElement('a')
	eleLink.download = name
	eleLink.style.display = 'none'
	eleLink.href = link
	document.body.appendChild(eleLink)
	eleLink.click()
	document.body.removeChild(eleLink)
}

export function downloadFile(name, content) {
	if (typeof name == 'undefined') {
		throw new Error('The first parameter name is a must')
	}
	if (typeof content == 'undefined') {
		throw new Error('The second parameter content is a must')
	}
	if (!(content instanceof Blob)) {
		if (typeof content !== 'string') {
			content = JSON.stringify(content, null, 2)
		}
		content = new Blob([content])
	}
	const link = URL.createObjectURL(content)
	download(link, name)
}
export function uuid(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
	let result = ''
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
	return result
}

export function copyToBoard(value) {
	const element = document.createElement('textarea')
	document.body.appendChild(element)
	element.value = value
	element.select()
	if (document.execCommand('copy')) {
		console.log('👴2022-03-03 16:37:04 index.ts line:52', document.execCommand('copy'))
		document.body.removeChild(element)
		return true
	}
	document.body.removeChild(element)
	return false
}

export function copy2Clipboard(textToCopy) {
	// navigator clipboard 需要https等安全上下文
	if (navigator.clipboard && window.isSecureContext) {
		// navigator clipboard 向剪贴板写文本
		return navigator.clipboard.writeText(textToCopy)
	} else {
		// 创建text area
		let textArea = document.createElement('textarea')
		textArea.value = textToCopy
		// 使text area不在viewport，同时设置不可见
		textArea.style.position = 'absolute'
		textArea.style.left = '-999999px'
		textArea.style.top = '-999999px'
		document.body.appendChild(textArea)
		textArea.focus()
		textArea.select()
		return new Promise<void>((res, rej) => {
			// 执行复制命令并移除文本框
			document.execCommand('copy') ? res() : rej()
			textArea.remove()
		})
	}
}

export function getType(obj) {
	let type = typeof obj
	if (type !== 'object') {
		// 先进行typeof判断，如果是基础数据类型，直接返回
		return type
	}

	const map = {
		array: 'any[]',
		object: '{}',
	}
	// 对于typeof返回结果是object的，再进行如下的判断，正则返回结果

	const t = Object.prototype.toString
		.call(obj)
		.replace(/^\[object (\S+)\]$/, '$1')
		.toLowerCase()

	return map[t] || t
}

// const  = (second) => { third }

export const parseObjectType = (obj: object): string => {
	const _obj = { ...obj }

	const loop = () => {
		Object.keys(_obj).forEach(key => {
			_obj[key] = getType(obj[key])
		})
	}
	loop()

	return JSON.stringify(_obj, null, 2).replace(/"/g, '').replace(/,/g, ';')
}

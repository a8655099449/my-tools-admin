import React, { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
import SelectArea, { SelectAreaProps } from './SelectArea'

export type MoveParams = {
	x: number
	y: number
	width: number
	height: number
	top: number
	right: number
	bottom: number
	left: number
	current: HTMLDivElement
}
type useSelectAreaProps = {
	ref: React.MutableRefObject<HTMLElement>
	onMove?(P: MoveParams): void
}

const useSelectArea = ({ ref, onMove }: useSelectAreaProps) => {
	const store = useRef({
		div: null as HTMLDivElement,
		start: false,
		left: 0,
		top: 0,
	})
	const areaBox = useRef<HTMLDivElement>()

	const handleMousedown = (e: MouseEvent) => {
		store.current.start = true
		const { clientX: left, clientY: top } = e
		store.current.left = left
		store.current.top = top
		setProps({ left, top, visible: true, width: 0, height: 0 })
		store.current.div.style.zIndex = '9999'

		console.log('👴down')
	}
	const handleMouseup = (e: MouseEvent) => {
		// return
		store.current.start = false
		store.current.div.style.zIndex = 'auto'
		setProps({ ...props, visible: false })
	}

	const handleMousemove = (e: MouseEvent) => {
		if (!store.current.start) {
			return
		}

		let { clientX, clientY } = e
		let { left, top } = store.current
		let width = 0
		let height = 0

		if (clientX > left) {
			width = clientX - left
		} else {
			width = left - clientX
			left -= width
		}

		if (clientY > top) {
			height = clientY - top
		} else {
			height = top - clientY
			top -= height
		}
		setProps({ left, top, visible: true, width, height })
		// console.log('👴2022-05-24 15:47:56 useSelectArea.tsx line:58',areaBox.current)
		// return
		const p = areaBox.current.getBoundingClientRect().toJSON()

		onMove?.({ ...p, current: areaBox.current })
	}

	const [props, setProps] = useState<SelectAreaProps>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		visible: false,
	})
	const bindWrap = () => {
		store.current.div = document.createElement('div')
		ref.current.style.position = 'relative'
		store.current.div.style.position = 'absolute'
		// store.current.div.style.zIndex = `0`

		store.current.div.style.top = '0px'
		store.current.div.style.bottom = '0px'
		store.current.div.style.left = '0px'
		store.current.div.style.right = '0px'
		store.current.div.addEventListener('mousedown', handleMousedown)
		store.current.div.addEventListener('mouseup', handleMouseup)
		store.current.div.addEventListener('mousemove', handleMousemove)
		store.current.div.style.userSelect = 'none'

		ref.current.appendChild(store.current.div)
	}
	const unBindEvent = () => {
		ref.current.removeChild(store.current.div)
		store.current.div = null
	}

	useEffect(() => {
		if (!ref.current || !ref.current.addEventListener) {
			return
		}

		bindWrap()
		return () => {
			unBindEvent()
		}
	}, [])

	useEffect(() => {
		render(<SelectArea {...props} box={areaBox} />, store.current.div)
	}, [props])

	return {}
}

export default useSelectArea

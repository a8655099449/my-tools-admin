import useMount from '@/pages/hooks/useMount'
import HandleMenu from '@/utils/use/HandleMenu'
import React, { useEffect, useRef, useState } from 'react'
import { render } from 'react-dom'
type T = {
	type: FileHandleType
	disabled: boolean
}

type UseRightMenuProps = {
	onMenuClick?(type: FileHandleType): void
	typeList?: FileHandleType[] | T[]
}
const useRightMenu = ({ onMenuClick, typeList }: UseRightMenuProps = {}) => {
	const ref = useRef<HTMLDivElement>()
	const store = useRef({ div: null })
	const [menuMenuPosition, setMenuMenuPosition] = useState({
		x: 0,
		y: 0,
	})
	const [menuVisible, setMenuVisible] = useState(false)
	const handleMenuClick = (type: FileHandleType) => {
		setMenuVisible(false)
		onMenuClick?.(type)
	}
	const onContextmenu = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const { clientX, clientY } = e
		setMenuMenuPosition({
			x: clientX,
			y: clientY,
		})
		setMenuVisible(true)
	}

	const closeMenu = () => {
		setMenuVisible(false)
	}

	useEffect(() => {
		store.current.div = document.createElement('div')
		ref.current.addEventListener('contextmenu', onContextmenu)
		ref.current.appendChild(store.current.div)
		document.body.addEventListener('click', closeMenu)

		return () => {
			ref.current?.removeChild(store.current.div)
			ref.current?.removeEventListener('contextmenu', onContextmenu)
			document.body.removeEventListener('click', closeMenu)
		}
	}, [])

	useEffect(() => {
		if (store.current.div) {
			render(<HandleMenu {...menuMenuPosition} visible={menuVisible} onMenuClick={handleMenuClick} typeList={typeList} />, store.current.div)
		}
	}, [menuVisible])

	return {
		context: ref,
	}
}

export default useRightMenu

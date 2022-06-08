import React, { FC, ReactElement } from 'react'

export type SelectAreaProps = {
	top: number
	left: number
	width: number
	height: number
	visible: boolean
	borderColor?: string
	backgroundColor?: string
}
const SelectArea: FC<
	SelectAreaProps & {
		box: any
	}
> = (props): ReactElement => {
	const { top, left, width, height, visible, borderColor = '#1362b4', backgroundColor = 'rgba(19, 98, 180 , .3)', box } = props
	return (
		<div
			ref={box}
			style={{
				position: 'fixed',
				top,
				left,
				width,
				height,
				display: visible ? 'block' : 'none',
				border: '1px solid #000',
				borderColor,
				backgroundColor,
			}}
		/>
	)
}

export default SelectArea

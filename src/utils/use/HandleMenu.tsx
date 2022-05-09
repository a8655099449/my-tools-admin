import IconDir from '@/components/Icon/IconDir'
import { Menu } from '@arco-design/web-react'
import { IconCopy, IconFile } from '@arco-design/web-react/icon'
import React, { FC, ReactElement, useMemo } from 'react'
type FileHandleTypeWithOptions = {
	type: FileHandleType
	disabled: boolean
}

interface IProps {
	visible: boolean
	x: number
	y: number
	onMenuClick(type: FileHandleType): void
	typeList: FileHandleType[] | FileHandleTypeWithOptions[]
}
const HandleMenu: FC<IProps> = ({ visible, x, y, onMenuClick, typeList = ['createText', 'makeDir'] }): ReactElement => {
	const _typeList = useMemo(() => {
		const renderItem = (key, rest = {}) => {
			const map = {
				createText: {
					content: (
						<Menu.Item key="createText">
							<IconFile />
							新建文件
						</Menu.Item>
					),
				},
				makeDir: {
					content: (
						<Menu.Item key="makeDir">
							<IconDir />
							新建文件夹
						</Menu.Item>
					),
				},
				copy: {
					content: (
						<Menu.Item key="copy">
							<IconCopy />
							复制
						</Menu.Item>
					),
				},
			}

			return map[key]?.content || null
		}

		return typeList.map(item => {
			if (typeof item === 'string') {
				return renderItem(item)
			}
			return renderItem(item.type)
		})
	}, [typeList])

	return (
		<div
			style={{
				width: 200,
				position: 'absolute',
				left: x,
				top: y,
				visibility: visible ? 'visible' : 'hidden',
				boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
				textAlign: 'left',
			}}
		>
			<Menu
				selectedKeys={[]}
				onClickMenuItem={(e, event) => {
					event.stopPropagation() // 阻止冒泡
					onMenuClick?.(e as FileHandleType)
				}}
			>
				{_typeList}
			</Menu>
		</div>
	)
}

export default HandleMenu

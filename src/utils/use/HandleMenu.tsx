import IconDir from '@/components/Icon/IconDir'
import { Menu } from '@arco-design/web-react'
import { IconCopy, IconDelete, IconEdit, IconFile, IconPaste } from '@arco-design/web-react/icon'
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
						<Menu.Item
							key="createText"
							onClick={e => {
								console.log('👴2022-05-24 14:09:51 HandleMenu.tsx line:25', e)
							}}
						>
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
				rename: {
					content: (
						<Menu.Item key="rename">
							<IconEdit />
							重命名
						</Menu.Item>
					),
				},
				delete: {
					content: (
						<Menu.Item key="delete">
							<IconDelete />
							删除
						</Menu.Item>
					),
				},
				paste: {
					content: (
						<Menu.Item key="paste">
							<IconPaste />
							粘贴
						</Menu.Item>
					),
				},
			}

			return map?.[key]?.content || null
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
				position: 'fixed',
				left: x,
				top: y,
				visibility: visible ? 'visible' : 'hidden',
				boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
				textAlign: 'left',
				zIndex: 99999,
				backgroundColor: '#fff',
			}}
		>
			<Menu
				selectedKeys={[]}
				onClickMenuItem={(e, event) => {
					console.log('👴menu click')
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

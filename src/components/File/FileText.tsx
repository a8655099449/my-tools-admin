import { confirm } from '@/utils'
import useRightMenu from '@/utils/use/useRightMenu'
import { Input } from '@arco-design/web-react'
import { IconFile } from '@arco-design/web-react/icon'
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import to from 'await-to-js'
import styles from './index.module.less'
type FileType = 'look' | 'rename'
interface IProps {
	onCopy?(): void
	onDelete?(): void
	onRename?(value: string): void
	onClick?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}
const FileText: FC<IProps & FileItemType> = ({ fileName, onCopy, onRename, onDelete, onClick, select }): ReactElement => {
	const [mode, setMode] = useState<FileType>('look')
	const inpRef = useRef<HTMLInputElement>()

	const [renameValue, setRenameValue] = useState(fileName)

	const onMenuClick = (type: FileHandleType) => {
		if (type === 'copy') {
			onCopy()
			return
		}

		if (type === 'rename') {
			onDoubleClickName()
			return
		}
		if (type === 'delete') {
			onDelete()
			return
		}
	}

	const { context } = useRightMenu({
		typeList: ['copy', 'rename', 'delete'],
		onMenuClick,
	})

	const onDoubleClickName = () => {
		setMode('rename')
		setTimeout(() => {
			inpRef.current.focus()
		}, 100)
	}

	useEffect(() => {
		setRenameValue(fileName)
	}, [fileName])

	return (
		<div className={`${styles['file-text']}  file-item ${select ? styles['select'] : ''}`} ref={context} onClick={onClick}>
			<IconFile className={`${styles['icon']}`} />

			{mode === 'look' && (
				<p
					onDoubleClick={e => {
						e.stopPropagation()
						onDoubleClickName()
					}}
				>
					{fileName}
				</p>
			)}

			<Input
				ref={inpRef as any}
				style={{
					display: mode === 'rename' ? 'inline-block' : 'none',
				}}
				value={renameValue}
				onChange={e => {
					setRenameValue(e)
				}}
				onPressEnter={() => {
					onRename(renameValue)
					setMode('look')
				}}
				onBlur={async () => {
					const [err] = await to(
						confirm({
							content: `是否将文件名更改为 ${renameValue} ? `,
						})
					)
					setMode('look')
					if (err) {
						return
					}
					onRename(renameValue)
				}}
			/>
		</div>
	)
}

export default FileText

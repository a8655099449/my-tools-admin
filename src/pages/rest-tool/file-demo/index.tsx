import FileText from '@/components/File/FileText'
import useRightMenu from '@/utils/use/useRightMenu'
import { Empty } from '@arco-design/web-react'

import { FC, ReactElement } from 'react'
import useFileHandle from './handle'

import styles from './index.module.less'

interface IProps {}

const File: FC<IProps> = (): ReactElement => {
	const { context, fileList, onCopy, onFileRename, onDelete, onFileItemClick, handleClickWrap } = useFileHandle()

	return (
		<div
			style={{
				height: 'calc(100vh - 80px)',
			}}
			ref={context}
			onClick={handleClickWrap}
		>
			<div className={`${styles['content-wrap']}`}>
				{fileList.length === 0 && <Empty description="暂无文件" />}
				<div
					style={{
						position: 'relative',
						zIndex: 1,
					}}
				>
					{fileList.map(item => (
						<FileText
							{...item}
							key={item.id}
							onCopy={() => {
								onCopy(item)
							}}
							onRename={e => {
								onFileRename({
									...item,
									fileName: e,
								})
							}}
							onDelete={() => {
								onDelete(item)
							}}
							onClick={e => {
								e.stopPropagation()
								onFileItemClick(item)
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default File

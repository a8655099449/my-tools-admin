import FileText from '@/components/File/FileText'
import useRightMenu from '@/utils/use/useRightMenu'
import { Empty } from '@arco-design/web-react'

import { FC, ReactElement } from 'react'
import useFileHandle from './handle'

interface IProps {}

const File: FC<IProps> = (): ReactElement => {
	const { context, fileList } = useFileHandle()
	return (
		<div
			style={{
				height: 'calc(100vh - 80px)',
				display: 'flex',
				flexWrap: 'wrap',
			}}
			ref={context}
		>
			{fileList.length === 0 && <Empty description="暂无文件" />}

			{fileList.map(item => (
				<FileText {...item} key={item.id} />
			))}
		</div>
	)
}

export default File

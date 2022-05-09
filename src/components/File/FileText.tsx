import useRightMenu from '@/utils/use/useRightMenu'
import { Icon } from '@arco-design/web-react'
import { IconFile } from '@arco-design/web-react/icon'
import React, { FC, ReactElement } from 'react'

import styles from './index.module.less'

interface IProps {
	onHandle()
}
const FileText: FC<IProps & FileItemType> = ({ fileName }): ReactElement => {
	const { context } = useRightMenu({
		typeList: ['copy'],
	})

	return (
		<div className={`${styles['file-text']}`} ref={context as any}>
			<IconFile className={`${styles['icon']}`} />
			<p>{fileName}</p>
		</div>
	)
}

export default FileText

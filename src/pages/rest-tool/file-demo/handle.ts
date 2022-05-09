import useRightMenu from '@/utils/use/useRightMenu'
import useStorage from '@/utils/useStorage'
import { useRef, useState } from 'react'

const FILEkEY = 'FILEkEY'

const useFileHandle = () => {
	const [fileList, setFileList] = useStorage<FileItemType[]>(FILEkEY, [])

	const ref = useRef({
		parentId: 0,
	})

	const onMenuClick = (type: FileHandleType) => {
		if (type === 'createText') {
			const newFile: FileItemType = {
				fileName: '新建文件',
				fileType: 'text',
				id: `${ref.current.parentId}${fileList.length + 1}`,
				path: '',
			}
			fileList.push(newFile)

			setFileList([...fileList])

			return
		}
	}
	const { context } = useRightMenu({
		onMenuClick,
	})
	return {
		fileList,
		setFileList,
		context,
	}
}

export default useFileHandle

import { confirm, isOverlap } from '@/utils'
import useRightMenu from '@/utils/use/useRightMenu'
import useSelectArea, { MoveParams } from '@/utils/use/useSelectArea'
import useStorage from '@/utils/useStorage'
import { Log } from '@antv/scale'
import { useThrottleFn } from 'ahooks'
import { useEffect, useRef, useState } from 'react'

const FILEkEY = 'FILEkEY'

const useFileHandle = () => {
	const [fileList, setFileList] = useStorage<FileItemType[]>(FILEkEY, [])
	const store = useRef({
		itemDomList: [] as MoveParams[],
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
		typeList: ['createText', 'makeDir', 'paste'],
	})

	useEffect(() => {
		const domList = document.querySelectorAll('.file-item')
		domList.forEach((item, index) => {
			const p = item.getBoundingClientRect().toJSON()
			store.current.itemDomList[index] = { ...p, current: item as HTMLDivElement }
		})
	}, [fileList])

	const handleMoveSelect = (p: MoveParams) => {
		const { itemDomList } = store.current
		itemDomList.forEach(({ current }, index) => {
			const is = isOverlap([current, p.current])
			if (is) {
				console.log('👴', index)
			}
		})
	}
	const { run: _handleMoveSelect } = useThrottleFn(handleMoveSelect, { wait: 100 })

	useSelectArea({
		ref: context,
		onMove: _handleMoveSelect,
	})

	const ref = useRef({
		parentId: 0,
		copyTarget: null,
	})

	const updateItem = (target: FileItemType) => {
		const index = fileList.findIndex(item => item.id === target.id)
		fileList[index] = target
		setFileList([...fileList])
	}

	const handleClickWrap = () => {
		setFileList(
			fileList.map(item => ({
				...item,
				select: false,
			}))
		)
	}

	const onFileRename = (item: FileItemType) => {
		updateItem(item)
	}

	const onCopy = (item: FileItemType) => {
		console.log('👴', item)
	}

	const onDelete = async (target: FileItemType) => {
		await confirm({
			title: '删除确认',
			content: `是否确认删除【${target.fileName}】？`,
		})

		const index = fileList.findIndex(item => item.id === target.id)
		fileList.splice(index, 1)
		setFileList([...fileList])
	}
	// ! 单击的时候选中一个
	const onFileItemClick = (target: FileItemType) => {
		fileList.forEach(item => {
			if (item.id === target.id) {
				item.select = !target.select
			} else {
				item.select = false
			}
		})

		// target.select = !target.select
		// updateItem(target)
		setFileList([...fileList])
	}

	return {
		fileList,
		setFileList,
		context,
		onCopy,
		onFileRename,
		onDelete,
		onFileItemClick,
		handleClickWrap,
	}
}

export default useFileHandle

import { Button, Upload, Table, Form, Select, Drawer, Input, Message } from '@arco-design/web-react'
import React, { Component, FC, ReactElement, useEffect, useRef, useState } from 'react'

import { defaultValue, exportExcel, exportExcelHandleStyle, formatSheetDate, importExcelFromBuffer } from './excel'
import { useRequest } from 'ahooks'
import FormTest from './FormTest'
import { IconExport, IconPrinter, IconSwap } from '@arco-design/web-react/icon'
import { ColumnProps } from '@arco-design/web-react/es/Table'
import { download, downloadFile, wait } from '@/utils'
import { RequestOptions } from '@arco-design/web-react/es/Upload'
import { ErrorBoundary } from 'react-error-boundary'
import { printWithBrowser } from '@/utils/print'
import ErrorCatch from '@/components/ErrorCatch'
import { methodCatch } from '@/components/ErrorCatch/errorCatch'
import { create } from './handle'
// import Table from "rc-table/lib/Table";

interface IProps {}
const ExcelToJson: FC<IProps> = (): ReactElement => {
	const [dataSource, setDataSource] = useState([])

	const [selectRow, setSelectRow] = useState('')
	const dom = useRef()

	const [columns, setColumns] = useState<ColumnProps[]>([])
	const ref = useRef({ fileName: 'test' })

	const [visible, setVisible] = useState(false)

	const [inputText, setInputText] = useState(() => {
		return JSON.stringify(defaultValue, null, 2)
	})
	useEffect(() => {
		parseData(defaultValue)
	}, [])
	const parseData = (data: any[]) => {
		if (Array.isArray(data) && data.length > 0) {
			const c = Object.keys(data[0]).map(k => ({
				dataIndex: k,
				title: k,
			}))

			setColumns(c)
			setDataSource(data)
		}
	}

	const localExcel = async (options: RequestOptions) => {
		const { file, onSuccess, onError } = options

		try {
			const buffer = await file.arrayBuffer()

			const data = importExcelFromBuffer(buffer)
			parseData(data)
			ref.current.fileName = file.name
			onSuccess(data)
		} catch (error) {
			onError(error)
		}
	}
	const parseDate = () => {
		const _d = dataSource.map(item => {
			Object.keys(item).forEach(k => {
				if (k === selectRow && typeof item[k] === 'number') {
					item[k] = formatSheetDate(item[k], '-')
				}
			})
			return item
		})
		setDataSource(_d)
	}

	return (
		<div ref={dom}>
			{/* <FormTest /> */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 10,
				}}
				draggable
			>
				<Upload customRequest={localExcel} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" showUploadList={false}>
					<Button type="primary">上传文件</Button>
				</Upload>

				<Button icon={<IconSwap />} onClick={() => setVisible(true)} draggable>
					json转excel
				</Button>

				<Button
					icon={<IconPrinter />}
					onClick={() => {
						printWithBrowser({ content: dom.current })
					}}
				>
					打印测试
				</Button>
				<Button
					onClick={() => {
						// exportExcel({ list: dataSource });
						downloadFile(`${ref.current.fileName}.json`, dataSource)
					}}
					disabled={dataSource.length === 0}
					icon={<IconExport />}
				>
					导出json
				</Button>
				<Button
					onClick={() => {
						exportExcel({ list: dataSource })
					}}
					disabled={dataSource.length === 0}
					icon={<IconExport />}
				>
					导出excel
				</Button>
			</div>
			<button onClick={create}>create</button>
			<div className="mb-10">
				<Select
					options={columns.map(item => ({
						value: item.title as string,
						label: item.title as string,
					}))}
					style={{
						width: 200,
						marginRight: 10,
					}}
					value={selectRow}
					onChange={setSelectRow}
				/>
				<Button type="primary" onClick={parseDate}>
					将该列转换为时间
				</Button>
			</div>

			<Table data={dataSource} columns={columns} rowKey="index" />

			<Test />

			<Drawer
				width={800}
				visible={visible}
				title="请输入Json内容"
				onCancel={() => setVisible(false)}
				onOk={() => {
					const value = JSON.parse(inputText.trim())
					if (Array.isArray(value)) {
						parseData(value)
						setVisible(false)
					} else {
						Message.warning('格式错误，请输入正确的json内容')
					}
				}}
			>
				<Input.TextArea
					autoSize
					style={{
						minHeight: '50vh',
					}}
					value={inputText}
					onChange={value => {
						setInputText(value)
					}}
				/>
			</Drawer>
		</div>
	)
}
// @methodCatch(`订单创建失败`)
class Test extends Component {
	createError = async () => {
		await wait(500)

		let a

		const { b } = a
		console.log('👴2022-03-22 14:24:14 index.tsx line:205', b)
	}

	render() {
		return (
			<div>
				<button
					onClick={e => {
						this.createError()
					}}
				>
					create err
				</button>
				<img src="aaa" alt="" />
			</div>
		)
	}
}

export default ExcelToJson

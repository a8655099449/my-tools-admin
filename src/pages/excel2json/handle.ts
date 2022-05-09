// const ExcelJS = require('exceljs');

import { download, downloadFile } from '@/utils'
import ExcelJS from 'exceljs'

export const create = () => {
	let workbook = new ExcelJS.Workbook()
	let worksheet = workbook.addWorksheet('My Sheet')

	worksheet.columns = [
		{ header: 'Id', key: 'id', width: 10 },
		{ header: 'Name', key: 'name', width: 32 },
		{ header: 'D.O.B.', key: 'DOB', width: 10 },
	]
	worksheet.addRow({ id: 1, name: 'Ionic Android', dob: new Date(1970, 1, 1) })
	worksheet.addRow({ id: 2, name: 'Ionic iOS', dob: new Date(1965, 1, 7) })
	let tempFilePath = 'PATH/temp.xlsx' // PATH is where you want to create your file

	workbook.xlsx.writeBuffer().then(function (data) {
		const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		const blob = new Blob([data], { type: fileType })
		downloadFile('xx.xls', blob)
	})
}

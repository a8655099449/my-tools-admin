import ErrorCatch from '@/components/ErrorCatch/index.js'
import lazyload from '@/components/lazyload'
import { Button } from '@arco-design/web-react'
import React, { FC, ReactElement, useEffect } from 'react'

import './test.js'

import { html2docx } from '@/utils/docx'
import textContent from './textContent.js'

interface IProps {}
const index: FC<IProps> = (): ReactElement => {
	// const List =  lazyload(`./pages/list/index.tsx`)
	useEffect(() => {
		// console.log('👴2022-03-22 11:13:36 index.tsx line:11',a)
	})
	const exportDocx = () => {
		html2docx({
			content: `
      <h1>text</h1>
			${textContent}
      `,
			fileName: 'xxxx',
			head: '左侧内容',
		})
	}
	const reg = /<li.*?style="(.*?)".*>/g
	let str = `
		<li style="color:red;" ></li><li style="color:red;" ></li>
		<li style="color:red;" ></li>
	`
	str = str.replace(/<\/li>/gis, '</li>\n')

	console.log(
		str.replace(reg, ($, $1 = '') => {
			if ($1) {
				$ = $.replace($1, 'line-height: 150%;font-size: 18.66px; font-family: 仿宋_GB2312;margin-left:11px;')
			}
			return $
		})
	)

	return (
		<div>
			<h1>is change A</h1>
			<h2>is change B</h2>
			<h3>is change C</h3>
			<Button onClick={exportDocx}>docx</Button>
		</div>
	)
}
export default index

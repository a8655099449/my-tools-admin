import { Tabs } from '@arco-design/web-react'
import React, { FC, ReactElement } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Demo1 from './Demo1/Demo1'
import Demo2 from './Demo2Beauyiful1'
import Demo3 from './Demo3'
import Demo4 from './Demo4'
// import Demo1 from "./Demo1";

interface IProps {}
const LowCode: FC<IProps> = (): ReactElement => {
	return (
		<div>
			<Tabs defaultActiveTab="demo1">
				<Tabs.TabPane key={'demo1'} title="demo1">
					<Demo1 />
				</Tabs.TabPane>
				<Tabs.TabPane key={'demo2'} title="demo2">
					<Demo2 />
				</Tabs.TabPane>
				<Tabs.TabPane key={'demo3'} title="demo3">
					<Demo3 />
				</Tabs.TabPane>
				<Tabs.TabPane key={'demo4'} title="demo4">
					<Demo4 />
				</Tabs.TabPane>
			</Tabs>
		</div>
	)
}

export default LowCode

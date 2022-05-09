import { Button } from '@arco-design/web-react'
import React, { FC, ReactElement } from 'react'

const Demo4: FC = (): ReactElement => {
	return (
		<div>
			<div
				draggable
				onDragStart={e => {
					console.log('👴2022-04-27 17:15:33 index.tsx line:9', '开始拖拽')
					// console.log('👴2022-04-27 17:15:54 index.tsx line:12',e.dataTransfer.setDragImage())

					e.dataTransfer.setData('DRAG_NODE_ID', 'e')
				}}
			>
				<Button>拖拽</Button>
			</div>
			<div
				style={{
					border: '1px solid #000',
					height: 300,
					marginTop: 20,
					padding: 10,
				}}
				onDrop={e => {
					console.log('👴2onDrop')
					const data = e.dataTransfer.getData('DRAG_NODE_ID')
					console.dir(data)
				}}
				onDragOver={e => e.preventDefault()}
			>
				box
			</div>
		</div>
	)
}

export default Demo4

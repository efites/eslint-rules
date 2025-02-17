import {useWebSocket} from '@siberiacancode/reactuse'
import {useEffect, useState} from 'react'
import {getFileTree, IFileTree} from '../api/tree'
import {Background, Controls, Position, ReactFlow, useEdgesState, useNodesState} from '@xyflow/react'
import '@xyflow/react/dist/style.css'


const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
	style: {
		borderRadius: '100%',
		backgroundColor: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}

const initialNodes = [
	{
		id: '1',
		position: {x: 0, y: 0},
		data: {
			label: '⬛️',
		},
		...nodeDefaults,
	},
	{
		id: '2',
		position: {x: 250, y: -100},
		data: {
			label: '🟩',
		},
		...nodeDefaults,
	},
	{
		id: '3',
		position: {x: 250, y: 100},
		data: {
			label: '🟧',
		},
		...nodeDefaults,
	},
	{
		id: '4',
		position: {x: 500, y: 0},
		data: {
			label: '🟦',
		},
		...nodeDefaults,
	},
]

const initialEdges = [
	{
		id: 'e1-2',
		source: '1',
		target: '2',
	},
	{
		id: 'e1-3',
		source: '1',
		target: '3',
	},
]


export const Main = () => {
	const [tree, setTree] = useState<IFileTree[]>([])
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	useEffect(() => {
		getFileTree().then(response => {
			if (!response || !response.data) return

			setTree(response.data)
		})
	}, [])

	useWebSocket('http://localhost:4325', {
		onMessage: async () => {
			const response = await getFileTree()

			if (!response || !response.data) return

			setTree(response.data)
		}
	})

	console.log(tree)

	return <div style={{height: '100vh'}}>
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			//onNodeDrag={onNodeDrag}
			//onNodeDragStop={onNodeDragStop}
			//onConnect={onConnect}
			//style={{backgroundColor: "#F7F9FB"}}
		>
			<Background />
			<Controls />
		</ReactFlow>
	</div>
}
import {useWebSocket} from '@siberiacancode/reactuse'
import {useEffect, useState} from 'react'
import {getFileTree} from '../api/tree'
import {Close} from '@mui/icons-material'
import {Background, Controls, Position, ReactFlow, useEdgesState, useNodesState, Node} from '@xyflow/react'
import {Box, Button, Drawer, Typography} from '@mui/material'
import '@xyflow/react/dist/style.css'


const nodeDefaults = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
	style: {
		backgroundColor: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}

const dirNode = {
	sourcePosition: Position.Right,
	targetPosition: Position.Left,
	style: {
		backgroundColor: '#ffc400',
		color: '#000',
		fontWeight: '600',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}

const fileNode = {
	sourcePosition: Position.Left,
	targetPosition: Position.Left,
	style: {
		backgroundColor: '#5c6bc0',
		color: '#fff',
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
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
	const [node, setNode] = useState<Node | null>(null)

	useEffect(() => {
		getFileTree().then(response => {
			if (!response || !response.data) return

			setNodes(response.data.nodes.map(node => node.data.type === 'dir' ? {...node, ...dirNode} : {...node, ...fileNode}))
			setEdges(response.data.edges)
		})
	}, [])

	useWebSocket('http://localhost:4325', {
		onMessage: async () => {
			const response = await getFileTree()

			if (!response || !response.data) return

			setTree(response.data)
		}
	})

	const clickNodeHandler = (event: React.MouseEvent, node: Node) => {
		console.log(node)
		setNode(node)
	}

	return <div style={{height: '100vh'}}>
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onNodeClick={clickNodeHandler}
		>
			<Background />
			<Controls />
		</ReactFlow>
		<Drawer open={!!node} onClose={() => setNode(null)} anchor='right'>
			<Box sx={{width: '100%', height: '100%', padding: '20px 30px', minWidth: '600px'}}>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant="h5" component="h5">{node?.data.label}</Typography>
					{/* <Typography variant="h5" component="h5">sdfdas awsd as</Typography> */}
					<Button onClick={() => setNode(null)}>
						<Close fontSize='large' />
					</Button>
				</Box>
				<Box></Box>
			</Box>
		</Drawer>
	</div>
}
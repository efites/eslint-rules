import {useWebSocket} from '@siberiacancode/reactuse'
import {useEffect, useState} from 'react'
import {getFileTree} from '../api/tree'
import {Check, Close, ErrorOutline, ExpandMore} from '@mui/icons-material'
import {Background, Controls, Position, ReactFlow, useEdgesState, useNodesState, Node} from '@xyflow/react'
import {Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Drawer, Typography} from '@mui/material'
import {getNodeInfo, INodeInfo} from '../api/node'
import {FileNode} from '../components/FileNode/FileNode'
import {DirNode} from '../components/DirNode/DirNode'
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
	type: 'dirNode',
}

const fileNode = {
	type: 'fileNode',
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

const nodeTypes = {fileNode: FileNode, dirNode: DirNode}

export const Main = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
	const [node, setNode] = useState<Node | null>(null)
	const [nodeInfo, setNodeInfo] = useState<INodeInfo | null>(null)

	useEffect(() => {
		getFileTree().then(response => {
			if (!response || !response.data) return

			setNodes(response.data.nodes.map(node => node.data.type === 'dir' ? {...node, ...dirNode} : {...node, ...fileNode}))
			setEdges(response.data.edges)
		})
	}, [])

	useEffect(() => {
		if (!node) return

		getNodeInfo(node).then(response => {
			if (!response || !response.data) return

			setNodeInfo(response.data)
		})

	}, [node])

	useWebSocket(`${import.meta.env.VITE_SERVER_URL}:${import.meta.env.VITE_WEBSOCKET_PORT}`, {
		onMessage: async () => {
			const response = await getFileTree()

			if (!response || !response.data) return

			setNodes(response.data.nodes.map(node => node.data.type === 'dir' ? {...node, ...dirNode} : {...node, ...fileNode}))
			setEdges(response.data.edges)
		}
	})

	const clickNodeHandler = (_: React.MouseEvent, node: Node) => {
		setNode(node)
	}

	return <div style={{height: '100vh'}}>
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onNodeClick={clickNodeHandler}
			nodeTypes={nodeTypes}
			connectionLineStyle={{stroke: 'green', strokeWidth: 2}}
		>
			<Background />
			<Controls />
		</ReactFlow>
		<Drawer open={!!node} onClose={() => setNode(null)} anchor='right'>
			<Box sx={{width: '100%', height: '100%', padding: '20px 30px', minWidth: '600px'}}>
				<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant="h5" component="h5" fontWeight={'bold'}>{String(node?.data.label)}</Typography>
					<Button onClick={() => setNode(null)}>
						<Close fontSize='large' />
					</Button>
				</Box>
				<Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px 0'}}>
					<Box sx={{display: 'flex', flexDirection: 'column', gap: '35px'}}>
						{/* <Typography variant="h6" component="h6">Информация о файле</Typography> */}
						<Divider />
						<Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
							<Typography variant="h6" component="h6" fontWeight={'medium'}>Ошибки</Typography>
							{nodeInfo && !nodeInfo.errors.length && (
								<Alert icon={<Check fontSize="inherit" />} severity="success">
									Ошибки не были найдены
								</Alert>
							)}
							{nodeInfo?.errors.map((error) => {
								return <Accordion key={error.id}>
									<AccordionSummary
										expandIcon={<ExpandMore />}
										aria-controls="panel1-content"
										id="panel1-header"
										sx={{
											'>span.MuiAccordionSummary-content': {
												margin: '10px 0'
											}
										}}
									>
										<Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
											<ErrorOutline color='error' />
											<Typography variant="subtitle1">{error.message}</Typography>
										</Box>
									</AccordionSummary>
									<AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '3px'}}>
										<Typography variant="body1">Путь: {nodeInfo.path}</Typography>
										<Typography variant="body1">Номер строки: {error.line}</Typography>
										<Typography variant="body1">Номер колонки: {error.column}</Typography>
										<Typography variant="body1">Тип ошибки: {error.ruleId}</Typography>
									</AccordionDetails>
								</Accordion>
							})}
						</Box>
						<Divider />
						<Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
							<Typography variant="h6" component="h6" fontWeight={'medium'}>Предупреждения</Typography>
							{nodeInfo && !nodeInfo.warnings.length && (
								<Alert icon={<Check fontSize="inherit" />} severity="success">
									Предупреждения не были найдены
								</Alert>
							)}
							{nodeInfo?.warnings.map(warning => {
								return <Accordion key={warning.id}>
									<AccordionSummary
										expandIcon={<ExpandMore />}
										aria-controls="panel1-content"
										id="panel1-header"
										sx={{
											'>span.MuiAccordionSummary-content': {
												margin: '10px 0'
											}
										}}
									>
										<Box sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
											<ErrorOutline color='warning' />
											<Typography variant="subtitle1">{warning.message}</Typography>
										</Box>
									</AccordionSummary>
									<AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: '3px'}}>
										<Typography variant="body1">Путь: {nodeInfo.path}</Typography>
										<Typography variant="body1">Номер строки: {warning.line}</Typography>
										<Typography variant="body1">Номер колонки: {warning.column}</Typography>
										<Typography variant="body1">Тип ошибки: {warning.ruleId}</Typography>
									</AccordionDetails>
								</Accordion>
							})}
						</Box>
					</Box>
				</Box>
			</Box>
		</Drawer>
	</div>
}
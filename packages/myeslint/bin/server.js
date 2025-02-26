import chokidar from 'chokidar';
import express from 'express';
import path from 'path'
import {WebSocketServer} from 'ws';
import {buildFileTree} from './helpers/buildFileTree.js'
import {getNodeInfo} from './helpers/getNodeInfo.js';


export const server = async () => {
	const app = express()
	const SERVER_PORT = 6123
	const INSPECTOR_PORT = 5173
	const WEBSOCKET_PORT = 4325

	app.use(express.static(path.resolve(process.cwd(), '../myeslint/app/dist')));  // Рекомендовано использовать path.resolve
	app.use((req, res, next) => {
		res.header('Access-Control-Allow-Origin', `http://localhost:${INSPECTOR_PORT}`)
		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
	});

	const wss = new WebSocketServer({port: WEBSOCKET_PORT});

	wss.on('connection', ws => {
		console.log('Client connected by web-socket');

		ws.on('close', () => {
			console.log('Client disconnected from web-socket');
		});
	});

	const sendMessage = (message) => {
		wss.clients.forEach(client => {
			client.send(JSON.stringify(message))
		});
	};

	// API endpoint to get the file structure
	app.get('/api/files', async (req, res) => {
		const projectRoot = process.cwd()
		const fileTree = await buildFileTree(projectRoot, ['node_modules'])

		res.json(fileTree)
	});

	app.get('/api/files/:id', getNodeInfo)

	// Start watching for file changes
	const watcher = chokidar.watch(path.resolve(process.cwd(), 'src'), {
		persistent: true
	});

	watcher.on('all', async (event, filePath) => {
		sendMessage('update')
	});

	app.listen(SERVER_PORT, () => {
		console.log(`✔️\tServer listening: \thttp://localhost:${SERVER_PORT}`);
		console.log(`✔️\tOpen the inspector: \thttp://localhost:${INSPECTOR_PORT}`);
	});
}
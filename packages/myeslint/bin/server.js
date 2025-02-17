import chokidar from 'chokidar';
import express from 'express';
import path from 'path'
import {WebSocketServer} from 'ws';
import {buildFileTree} from './helpers/buildFileTree.js'


export const server = async () => {
	const app = express()
	const port = 6123
	const clientPort = 3000

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', `http://localhost:${5173}`); // Allow requests from your React app
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		next();
	});

	const wss = new WebSocketServer({port: 8080});

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
		const fileTree = await buildFileTree(projectRoot)
		res.json(fileTree)
	});

	// Start watching for file changes
	const watcher = chokidar.watch(path.resolve(process.cwd(), 'src'), {
		persistent: true
	});

	watcher.on('all', (event, filePath) => {
		console.log(`File ${filePath} has been ${event}`);
		sendMessage({type: 'file-change', path: filePath, event});
	});

	app.listen(port, () => {
		console.log(`Server listening on http://localhost:${port}`);
	});
}
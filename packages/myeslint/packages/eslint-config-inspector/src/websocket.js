import chokidar from 'chokidar';
import path from 'path'
import {WebSocketServer} from 'ws';
import {WEBSOCKET_PORT} from '../index.js'


export let wss = null
export const websocket = async () => {
	wss = new WebSocketServer({port: WEBSOCKET_PORT});

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

	// Start watching for file changes
	const watcher = chokidar.watch(path.resolve(process.cwd(), 'src'), {
		persistent: true,
	});

	watcher.on('all', async (event, filePath) => {
		sendMessage('update')
	});
}

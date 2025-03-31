#!/usr/bin/env node
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import {websocket} from './src/websocket.js'
import {router} from './src/routes/routes.js'
import {getCorsOptions} from './src/helpers/cors.js'
import {getConfig} from './src/helpers/getConfig.js'


export const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
export const SERVER_PORT = process.env.SERVER_PORT || 8765 || 3344
export const INSPECTOR_PORT = process.env.INSPECTOR_PORT || 7654 || 4455
export const WEBSOCKET_PORT = process.env.APP_PORT || 6543 || 5566

// Init an app
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Routes
app.use(express.static(path.join(__dirname, 'app', 'dist')));
app.use('/', router)
app.use(cors(getCorsOptions()))

// Start
const serverApp = app.listen(SERVER_PORT, () => {
	websocket()

	console.log(`✔️\tOpen the inspector: \t${SERVER_URL}:${SERVER_PORT}/`);
})

serverApp.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.log(`Порт уже занят! Не буду поднимать сервер.`);

		return
	} else {
		console.error('Какая-то другая ошибка при запуске сервера:', error);

		return
	}
});

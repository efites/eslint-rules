#!/usr/bin/env node
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import express from 'express'
import {websocket} from './src/websocket.js'
import {router} from './src/routes/routes.js'

export const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
export const SERVER_PORT = process.env.SERVER_PORT || 3344
export const INSPECTOR_PORT = process.env.INSPECTOR_PORT || 4455
export const WEBSOCKET_PORT = process.env.APP_PORT || 5566

const whitelist = [`${SERVER_URL}:${WEBSOCKET_PORT}`, `${SERVER_URL}:5173`]
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}, // Запросы только с этого источника
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Разрешенные методы
	allowedHeaders: 'X-Requested-With,content-type', // Разрешённые заголовки
	credentials: true, // Разрешаем передачу кук и заголовков авторизации
	optionsSuccessStatus: 204 //  Некоторые старые браузеры (IE11) требуют 204 для OPTIONS
}

// Init an app
const app = express()
console.log('Path:', path.resolve('./app/dist'))
// Routes
app.use(express.static(path.resolve('./app/dist')));
app.use('/', router)
app.use(cors(corsOptions))
websocket().then(data => console.log('WebSocket:', data))

// Start
app.listen(SERVER_PORT, () => {
	console.log(`✔️\tOpen the inspector: \t${SERVER_URL}:${SERVER_PORT}/`);
})
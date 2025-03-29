#!/usr/bin/env node
import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import {websocket} from './src/websocket.js'
import {router} from './src/routes/routes.js'
import {getConfig} from './src/helpers/getConfig.js'
import {eslint as EslintInitConfig} from '@efites/eslint-config'



export const SERVER_URL = process.env.SERVER_URL || 'http://localhost'
export const SERVER_PORT = process.env.SERVER_PORT || 8765 || 3344
export const INSPECTOR_PORT = process.env.INSPECTOR_PORT || 7654 || 4455
export const WEBSOCKET_PORT = process.env.APP_PORT || 6543 || 5566

const whitelist = [`${SERVER_URL}:${SERVER_PORT}/`, `${SERVER_URL}:5173/`]
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			console.log(origin)
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
export let config = [{}]
getConfig(config).then(conf => {
	config = conf
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// Routes
app.use(express.static(path.join(__dirname, 'app', 'dist')));
app.use('/', router)
app.use(cors(corsOptions))
websocket()

// Start
export const serverApp = app.listen(SERVER_PORT, () => {
	console.log(`✔️\tOpen the inspector: \t${SERVER_URL}:${SERVER_PORT}/`);
})

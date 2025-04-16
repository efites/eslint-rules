import path from 'node:path'
import {createRouter, defineEventHandler, handleCors, serveStatic} from "h3"
import {readFile, stat} from 'node:fs/promises'
import {lookup} from 'mrmime'
import {buildFileTree} from '../helpers/buildFileTree'
import {getFilePathById} from '../helpers/getFilePathById'
import {analyzeFile} from '../helpers/analyzeFile'
import {getConfig} from '../helpers/getConfig'
import {SERVER_PORT, SERVER_URL} from '../index'


const whitelist = [`${SERVER_URL}:${SERVER_PORT}/`, `${SERVER_URL}:5173/`, 'http://localhost:3000']

const router = createRouter()

router.use('/**',
	defineEventHandler(async (event) => {
		const didHandleCors = handleCors(event, {
			origin: function (origin) {
				console.log('origin', origin)
				if (whitelist.indexOf(origin) !== -1 || !origin) {
					return true
				}
				return false
			},
			preflight: {
				statusCode: 204,
			},
			methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  // Разрешенные методы
			allowHeaders: ['X-Requested-With', 'content-type'], // Разрешённые заголовки
			credentials: true, // Разрешаем передачу кук и заголовков авторизации
		})
		console.log('didHandleCors', didHandleCors)
		if (didHandleCors) {
			return
		}
		// Your code here


		/* const getCorsOptions = () => {
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

			return corsOptions
		} */
	})
)

router.get(
	'/tree',
	defineEventHandler(async (event) => {
		console.log('get tree')
		const projectRoot = process.cwd()
		const config = await getConfig()
		const fileTree = await buildFileTree(projectRoot, ['node_modules'], config)

		return fileTree
	})
).get(
	'/tree/:id',
	defineEventHandler(async (event): Promise<ReturnType<typeof analyzeFile> | null> => {
		const id = event.context.params?.id

		if (!id) return null

		const filePath = getFilePathById(id)

		if (!filePath) return null

		const result = await analyzeFile(filePath)

		return result
	})
)

export {router}

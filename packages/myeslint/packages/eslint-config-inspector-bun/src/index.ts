#!/usr/bin/env node
import path from 'node:path'
import {config} from 'dotenv'
import {createServer} from 'node:http'
import {readFile, stat} from 'node:fs/promises'
import {lookup} from 'mrmime'
import {createApp, defineEventHandler, serveStatic, toNodeListener} from "h3"
import {router} from './routes/routes'
import {websocket} from './helpers/websocket'


// Env. variables
config({path: path.resolve(__dirname, '..', '..', '..', '.env')})

export const app = createApp()
export const SERVER_URL = process.env.VITE_SERVER_URL
export const SERVER_PORT = process.env.VITE_SERVER_PORT
export const WEBSOCKET_PORT = process.env.VITE_WEBSOCKET_PORT

app.use(router)
app.use(
	defineEventHandler((event) => {
		const staticPath = path.join(__dirname, '..', '..', '..', 'dist', 'app')
		console.log(staticPath)

		return serveStatic(event, {
			getContents: (file) => readFile(path.join(staticPath, file)),
			getMeta: async (file) => {
				const stats = await stat(path.join(staticPath, file))

				if (!stats || !stats.isFile()) {
					return
				}

				return {
					type: lookup(file),
					size: stats.size,
					mtime: stats.mtimeMs
				}
			}
		})
	}),
)

const server = createServer(toNodeListener(app))


server.listen(SERVER_PORT, async () => {
	const url = `http://localhost:${SERVER_PORT}`
	websocket().catch(ex => console.log('Websocker Error: ', ex, '\n'))

	console.log(`Starting eslint-config-bun at`, url, '\n')
})


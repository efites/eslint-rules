#!/usr/bin/env node
import path from 'node:path'
import {createServer} from 'node:http'
import {readFile, stat} from 'node:fs/promises'
import {lookup} from 'mrmime'
import {createApp, defineEventHandler, serveStatic, toNodeListener} from "h3"


export const app = createApp()
const port = import.meta.env.VITE_SERVER_PORT
console.log("PORT = ", port)
const server = createServer(toNodeListener(app))

app.use(
	defineEventHandler((event) => {
		return serveStatic(event, {
			getContents: (file) => readFile(path.join(__dirname, '..', 'dist', 'app', file)),
			getMeta: async (file) => {
				const stats = await stat(path.join(__dirname, '..', 'dist', 'app', file))

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

server.listen(port, async () => {
	const url = `http://localhost:${port}`

	console.log(`Starting eslint-config-bun at`, url, '\n')
})

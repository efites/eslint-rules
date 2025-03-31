#!/usr/bin/env node
import path from 'node:path'
import {readFile, stat} from 'node:fs/promises'
import {lookup} from 'mrmime'
import {createApp, defineEventHandler, serveStatic} from "h3"

export const app = createApp()

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

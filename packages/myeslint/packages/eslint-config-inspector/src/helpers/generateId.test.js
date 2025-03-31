import {generateId} from './generateId.js'
import path from 'path'
import fs from 'fs'


describe('Generate id', () => {
	test('id for the same file', async () => {
		const filePath = path.resolve(process.cwd(), 'index.js')
		const firstGenId = generateId(filePath)
		const secondGenId = generateId(filePath)

		expect(firstGenId).toBe(secondGenId)
	})

	test('id for aonother files', async () => {
		const firstFilePath = path.resolve(process.cwd(), 'index.js')
		const secondFilePath = path.resolve(process.cwd(), 'package.json')
		const firstGenId = generateId(firstFilePath)
		const secondGenId = generateId(secondFilePath)

		expect(firstGenId).not.toBe(secondGenId)
	})

	test('id for a non-existent file', async () => {
		const filePath = path.resolve(process.cwd(), 'undefined')
		const preId = 'd44e81cc-3e35-597f-8364-8414429a3a7e'
		const genId = generateId(filePath)

		console.log('generated ID:', genId)

		expect(genId).toBe(preId)
	})
})

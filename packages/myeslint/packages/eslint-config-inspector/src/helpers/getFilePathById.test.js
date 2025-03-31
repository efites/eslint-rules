import path from 'path'
import {generateId} from './generateId.js'
import {getFilePathById} from './getFilePathById.js'


describe('Get path of a file by id', () => {
	test('File exists', async () => {
		const originalPath = path.resolve(process.cwd(), 'index.js')
		const id = generateId(originalPath)
		const recievedPath = getFilePathById(id)

		expect(recievedPath).toBe(originalPath)
	})

	test('File doesn\'t exist', async () => {
		const originalPath = 'undefined'
		const id = generateId(originalPath)
		const recievedPath = getFilePathById(id)

		expect(recievedPath).toBe(null)
	})
})

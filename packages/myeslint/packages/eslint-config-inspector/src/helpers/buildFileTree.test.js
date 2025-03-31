import {expect, test, describe} from 'vitest'
import path from 'path'
import {buildFileTree} from './buildFileTree.js'


describe('Build file tree', () => {

	test('Has correct properties', async () => {
		const projectRoot = path.resolve(process.cwd(), '..', '..', '..', 'react')
		const tree = await buildFileTree(projectRoot, ['node_modules'])

		expect(tree).toHaveProperty('nodes')
		expect(tree).toHaveProperty('edges')
	})

	test('Not exists', async () => {
		const projectRoot = 'undefined'
		expect.assertions(1)

		try {
			await buildFileTree(projectRoot, ['node_modules'])
		} catch (error) {
			expect(error.message).toMatch(/^Неправильно указан путь к файлу/)
		}
	});
})

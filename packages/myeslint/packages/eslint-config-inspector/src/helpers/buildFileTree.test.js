import {buildFileTree} from './buildFileTree.js'


describe('Build file tree', () => {

	test('Has correct properties', async () => {
		const projectRoot = 'D:\\Университет\\Диплом\\eslint-rules\\packages\\react'
		const tree = await buildFileTree(projectRoot, ['node_modules'])

		expect(tree).toHaveProperty('nodes')
		expect(tree).toHaveProperty('edges')
	})

	test('Not exists', async () => {
		const projectRoot = 'undefined'
		await expect(await buildFileTree(projectRoot, ['node_modules'])).toThrow()
	});
})

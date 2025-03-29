import path from 'path'
import {analyzeFile} from './analyzeFile.js'
import {getNodeInfo} from './getNodeInfo.js'


describe('Analyze a file', () => {
	test('Has correct properties', async () => {
		getNodeInfo()
	})

	test('Not exists', async () => {
		const nonExistentPath = '/non/existent/path';
		await expect(analyzeFile(nonExistentPath)).rejects.toThrow();
	});
});

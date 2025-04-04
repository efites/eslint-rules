import {expect, test, describe} from 'vitest'
import path from 'path'
import {analyzeFile} from './analyzeFile.js'


describe('Analyze a file', () => {
	test('Has correct properties', async () => {
		const testFilePath = path.join(process.cwd(), 'src', 'helpers', 'sum.js');
		const result = await analyzeFile(testFilePath);

		expect(result).toHaveProperty('errors');
		expect(result).toHaveProperty('warnings');
		expect(result).toHaveProperty('metrics');
		expect(result).toHaveProperty('path');
	})

	test('Not exists', async () => {
		const nonExistentPath = '/non/existent/path';
		await expect(analyzeFile(nonExistentPath)).rejects.toThrow();
	});
});

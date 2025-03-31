import {expect, test, describe} from 'vitest'
import {getConfig} from './getConfig.js'
import path from 'path'
import fs from 'fs'


describe('Get config', () => {
	test('get config from the configuration file', async () => {
		const eslintFilePath = path.resolve(process.cwd(), './eslint.config.js')
		const config = await getConfig()

		if (fs.existsSync(eslintFilePath)) {
			expect(Array.isArray(config)).toBe(true)
			return
		}

		expect(config).toStrictEqual([{}])
	})
})

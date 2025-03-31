import {expect, test, describe} from 'vitest'
import path from 'path'
import {generateId} from './generateId.js'
import {getNodeInfo} from './getNodeInfo.js'


describe('Get node info', () => {
	test('File exists', async () => {
		const request = {
			params: {
				id: generateId(path.resolve(process.cwd(), 'index.js'))
			}
		}
		const response = {
			json(result) {
				return JSON.stringify(result)
			}
		}

		const nodeInfo = await getNodeInfo(request, response)
		const result = JSON.parse(nodeInfo)

		expect(result).toHaveProperty('errors');
		expect(result).toHaveProperty('warnings');
		expect(result).toHaveProperty('metrics');
		expect(result).toHaveProperty('path');
	})
})

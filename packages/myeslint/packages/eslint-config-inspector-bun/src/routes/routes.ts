import {createRouter, defineEventHandler} from "h3"
import {buildFileTree} from '../helpers/buildFileTree'
import {getFilePathById} from '../helpers/getFilePathById'
import {analyzeFile} from '../helpers/analyzeFile'
import {getConfig} from '../helpers/getConfig'


const router = createRouter()

router.get(
	'/tree',
	defineEventHandler(async (event) => {
		// TODO - хардкод url
		event.node.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
		event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
		event.node.res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
		event.node.res.setHeader('Access-Control-Allow-Credentials', 'true')

		const projectRoot = process.cwd()
		const config = await getConfig()
		const fileTree = await buildFileTree(projectRoot, ['node_modules'], config)

		return fileTree
	})
).get(
	'/tree/:id',
	defineEventHandler(async (event): Promise<ReturnType<typeof analyzeFile> | null> => {
		// TODO - хардкод url
		event.node.res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
		event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
		event.node.res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
		event.node.res.setHeader('Access-Control-Allow-Credentials', 'true')

		const id = event.context.params?.id

		if (!id) return null

		const filePath = getFilePathById(id)

		if (!filePath) return null

		const result = await analyzeFile(filePath)

		return result
	})
)

export {router}

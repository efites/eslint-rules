/* import {defineEventHandler} from 'h3'
import {router} from './routes'
import {buildFileTree} from '../helpers/buildFileTree'
import {getFilePathById} from '../helpers/getFilePathById'
import {analyzeFile} from '../helpers/analyzeFile'

router.get(
	'/tree',
	defineEventHandler(async (event) => {
		const projectRoot = process.cwd()
		const fileTree = await buildFileTree(projectRoot, ['node_modules'])

		return fileTree
	})
).get(
	'/tree/:id',
	defineEventHandler(async (event): Promise<ReturnType<typeof analyzeFile> | null> => {
		const id = event.context.params?.id

		if (!id) return null

		const filePath = getFilePathById(id)

		if (!filePath) return null

		const result = await analyzeFile(filePath)

		return result
	})
)





const router = new Router()

router.get('/', getFullTree)
router.get('/:id', getNode)


 */

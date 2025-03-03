import {buildFileTree} from '../helpers/buildFileTree.js'
import {getFilePathById} from '../helpers/getFilePathById.js'
import {analyzeFile} from '../helpers/analyzeFile.js'



const getFullTree = async (request, response) => {
	const projectRoot = process.cwd()
	const fileTree = await buildFileTree(projectRoot, ['node_modules'])

	response.json(fileTree)
}

const getNode = async (request, response) => {
	const {id} = request.params
	const filePath = getFilePathById(id)

	const result = await analyzeFile(filePath)

	return response.json(result)
}

export {getFullTree, getNode}
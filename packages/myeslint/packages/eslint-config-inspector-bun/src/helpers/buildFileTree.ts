import fs from 'fs'
import path from 'path'
import {generateId} from './generateId'
import {ESLint} from "eslint"
import {getConfig} from "./getConfig"
import {INode} from '../types/INodes'
import {IEdge} from '../types/IEdge'


const HORIZONTAL_SPACING = 270
const VERTICAL_SPACING = 80

export async function buildFileTree(rootPath: string, skipPaths: string[] = [], config: Object[]) {
	if (!fs.existsSync(rootPath)) {
		throw new Error(`Неправильно указан путь к файлу ${rootPath}`)
	}

	const nodes: INode[] = []
	const edges: IEdge[] = []
	const levelPositions: Record<string, number> = {} // Хранит последнюю использованную позицию для каждого уровня

	function countContents(dirPath: string) {
		let count = 0
		try {
			const entries = fs.readdirSync(dirPath)
			entries.forEach(entry => {
				const fullPath = path.join(dirPath, entry)
				if (fs.statSync(fullPath).isDirectory()) {
					count += 1 + countContents(fullPath)
				} else {
					count += 1
				}
			})
		} catch (err) {
			console.error(`Ошибка при подсчете содержимого ${dirPath}: ${err}`)
		}
		return count
	}

	// Функция для получения следующей доступной позиции Y для определенного уровня
	function getNextYPosition(depth: number) {
		if (!(depth in levelPositions)) {
			levelPositions[depth] = 0
		}
		const position = levelPositions[depth]
		levelPositions[depth] += VERTICAL_SPACING

		return position
	}

	async function traverse(currentPath: string, depth: number, parentId?: string) {
		const relativePath = path.relative(rootPath, currentPath)

		if (skipPaths.some(skip => relativePath === skip || relativePath.startsWith(skip + path.sep))) {
			return
		}

		let stats
		try {
			stats = fs.statSync(currentPath)
		} catch (err) {
			console.error(`Ошибка чтения ${currentPath}: ${err}`)
			return
		}

		const type: INode['data']['type'] = stats.isDirectory() ? 'dir' : 'file'
		const label = path.basename(currentPath)

		const nodeId = currentPath
		const node = {
			id: generateId(currentPath),
			path: currentPath,
			position: {
				x: depth === 0 ? -HORIZONTAL_SPACING : depth * HORIZONTAL_SPACING,
				y: getNextYPosition(depth),
			},
			data: {
				label: label,
				type: type,
				contentCount: type === 'dir' ? countContents(currentPath) : 0,
				errors: 0,
				warnings: 0,
			},
		}

		if (type === 'file') {
			const eslint = new ESLint({baseConfig: config})
			const analyzeResult = await eslint.lintFiles([currentPath])

			if (analyzeResult.length !== 0) {
				const fileResult = analyzeResult[0]
				const errors = fileResult.messages.filter(msg => msg.severity === 2)
				const warnings = fileResult.messages.filter(msg => msg.severity === 1 && msg.message !== 'File ignored because no matching configuration was supplied.')

				node.data.errors = errors.length
				node.data.warnings = warnings.length

				if (errors.length) {
					const formatter = await eslint.loadFormatter('stylish') // 'stylish' - стандартный формат
					const resultText = await formatter.format([fileResult])
					console.log(resultText)
				}
			}
		}
		node

		nodes.push(node)

		if (parentId !== undefined) {
			edges.push({
				id: generateId(currentPath),
				source: generateId(parentId),
				target: generateId(currentPath),
			})
		}

		if (stats.isDirectory()) {
			try {
				const entries = fs.readdirSync(currentPath)
				const sortedEntries = entries.map(entry => {
					const fullPath = path.join(currentPath, entry)
					const stat = fs.statSync(fullPath)
					return {
						name: entry,
						fullPath: fullPath,
						isDirectory: stat.isDirectory(),
						contentCount: stat.isDirectory() ? countContents(fullPath) : 0,
						nameLength: entry.length
					}
				}).sort((a, b) => {
					if (a.isDirectory && b.isDirectory) {
						return b.contentCount - a.contentCount
					}
					if (a.isDirectory !== b.isDirectory) {
						return a.isDirectory ? -1 : 1
					}
					return a.nameLength - b.nameLength
				})

				for (const entry of sortedEntries) {
					await traverse(entry.fullPath, depth + 1, nodeId)
				}
			} catch (err) {
				console.error(`Ошибка чтения директории ${currentPath}: ${err}`)
				return
			}
		}
	}

	await traverse(rootPath, 0, undefined)

	return {
		nodes,
		edges,
	}
}

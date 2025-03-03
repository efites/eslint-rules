import fs from 'fs'
import path from 'path'
import {generateId} from './generateId.js'


export const getFilePathById = (id, projectPath = process.cwd()) => {
	if (!fs.existsSync(projectPath)) {
		throw new Error(`Путь не существует: ${projectPath}`);
	}

	const items = fs.readdirSync(projectPath);

	for (const item of items) {
		const itemPath = path.join(projectPath, item);
		const stat = fs.statSync(itemPath);

		const uuid = generateId(itemPath);

		if (uuid === id) {
			return itemPath; // Найден файл или папка с нужным UUID
		}

		if (stat.isDirectory()) {
			const result = getFilePathById(id, itemPath);
			if (result) {
				return result; // Найден файл или папка в поддиректории
			}
		}
	}

	return null; // UUID не найден
}
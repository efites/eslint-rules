import {ESLint} from "eslint"
import {generateId} from './generateId.js'
import { parse } from "@babel/parser";
import fs from 'fs'
import path from 'path'


export async function getNodeInfo(request, response) {
	const {id} = request.params
	const filePath = getFilePathById(id)

	const eslint = new ESLint();
	const results = await eslint.lintFiles([filePath]);
	const formattedResults = results.map(result => {
		const fileInfo = analyzeFile(result.filePath);

		return {
			filePath: result.filePath,
			errorCount: result.errorCount,
			warningCount: result.warningCount,
			messages: result.messages,
			...fileInfo,
		};
	});

	return response.json(formattedResults, null, 2)
}

function analyzeFile(filePath) {
	const content = fs.readFileSync(filePath, "utf-8");
	const ast = parse(content, {
		sourceType: "module",
		plugins: ["jsx"], // Добавьте плагины, если используете JSX или другие фичи
	});

	// Подсчет импортов
	const imports = ast.program.body.filter(node => node.type === "ImportDeclaration").length;

	// Подсчет сложности методов (пример)
	const complexity = 0; // Здесь можно использовать библиотеку для анализа сложности

	return {
		imports,
		complexity,
	};
}

function getFilePathById(id, projectPath = process.cwd()) {
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

/*export interface INodeInfo {
	path: string,
	imports: number,
	complexity: number
	errors: [{
		id: number
		message: string
		line: number
		column: number
	}],
	warnings: [{
		id: number
		message: string
		line: number
		column: number
	}],
} */
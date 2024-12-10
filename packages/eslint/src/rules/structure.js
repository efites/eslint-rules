import path from 'path'
import fs, {constants} from 'fs'


/** @type {import('eslint').Rule.RuleModule} */
export const structure = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Расширенная проверка структуры проекта',
		},
		fixable: 'code',
		schema: [{
			type: 'object',
			properties: {
				folders: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
				files: {
					type: 'array',
					items: {
						type: 'string',
					},
				},
			},
			required: ['folders', 'files'],
		}]
	},

	create(context) {
		return {
			Program(node) {
				const filename = context.filename
				const projectRoot = findProjectRoot(path.dirname(filename))

				if (!projectRoot) {
					context.report({
						node,
						message: 'Could not find project root directory.',
					});
					return;
				}

				const options = context.options[0] || {};
				const requiredFolders = options.folders || [];
				const requiredFiles = options.files || [];

				const missingFolders = checkRequiredFolders(projectRoot, requiredFolders);
				const missingFiles = checkRequiredFiles(projectRoot, requiredFiles);

				missingFolders.forEach(folder => {
					context.report({
						node,
						message: `Missing required folder: ${folder}`,
						fix: fixer => {
							const folderPath = path.join(projectRoot, folder);
							fs.mkdirSync(folderPath, {recursive: true});
							return fixer.replaceTextRange([0, 0], `// Created folder: ${folder}\n`);
						},
					});
				})

				missingFiles.forEach(file => {
					context.report({
						node,
						message: `Missing required file: ${file}`,
						fix: fixer => {
							const filePath = path.join(projectRoot, file);
							fs.writeFileSync(filePath, '');
							return fixer.replaceTextRange([0, 0], `// Created file: ${file}\n`);
						},
					});
				})
			}
		};
	}
}

function findProjectRoot(filePath) {
	// Преобразуем относительный путь в абсолютный, если необходимо
	const absolutePath = path.isAbsolute(filePath)
		? filePath
		: path.resolve(process.cwd(), filePath);

	// Начинаем с директории, содержащей файл
	let currentDir = path.dirname(absolutePath);

	const root = path.parse(currentDir).root;

	while (currentDir !== root) {
		const packageJsonPath = path.join(currentDir, 'package.json');

		if (fs.existsSync(packageJsonPath)) {
			// package.json найден, возвращаем текущую директорию как корень проекта
			return currentDir;
		}

		// Поднимаемся на уровень выше
		currentDir = path.dirname(currentDir);
	}
}

function checkRequiredFolders(projectRoot, requiredFolders) {
	const missingFolders = [];

	for (const folder of requiredFolders) {
		const folderPath = path.join(projectRoot, folder);
		if (!fs.existsSync(folderPath)) {
			missingFolders.push(folder);
		}
	}

	return missingFolders;
}

function checkRequiredFiles(projectRoot, requiredFiles) {
	const missingFiles = [];

	for (const file of requiredFiles) {
		const filePath = path.join(projectRoot, file);
		if (!fs.existsSync(filePath)) {
			missingFiles.push(file);
		}
	}

	return missingFiles;
}

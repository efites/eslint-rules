/** @type {import('eslint').Rule.RuleModule} */
export const sortImports = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow unsorted import declarations',
			category: 'Best Practices',
			recommended: false,
		},
		fixable: 'code',
		messages: {
			sortedImports: 'Импорты должны быть отсортированы.',
		},
		schema: [], // Нет опций
	},
	create(context) {
		const sourceCode = context.getSourceCode();

		return {
			Program(program) {
				const importDeclarations = program.body.filter((node) => node.type === 'ImportDeclaration');
				if (importDeclarations.length === 0) return;

				const defaultImports = [];
				const namedImports = [];
				const otherImports = [];

				importDeclarations.forEach((importDeclaration) => {
					if (importDeclaration.specifiers.length === 0) {
						otherImports.push(importDeclaration);
					} else if (importDeclaration.specifiers[0].type === 'ImportDefaultSpecifier') {
						defaultImports.push(importDeclaration);
					} else {
						namedImports.push(importDeclaration);
					}
				});

				// Сортировка импортов по длине строки
				defaultImports.sort((a, b) => sourceCode.getText(a).length - sourceCode.getText(b).length);
				namedImports.sort((a, b) => sourceCode.getText(a).length - sourceCode.getText(b).length);
				otherImports.sort((a, b) => sourceCode.getText(a).length - sourceCode.getText(b).length);

				let isLinesOk = true
				if (defaultImports.length && otherImports.length) {
					const emptyLines = getEmptyLinesBetween(defaultImports[defaultImports.length - 1], otherImports[otherImports.length - 1], sourceCode)
					if (emptyLines !== 1) {
						isLinesOk = false
					}
				}
				if (otherImports.length && namedImports.length) {
					const emptyLines = getEmptyLinesBetween(otherImports[otherImports.length - 1], namedImports[namedImports.length - 1], sourceCode)
					if (emptyLines !== 1) {
						isLinesOk = false
					}
				}
				if (!otherImports.length && defaultImports.length && namedImports.length) {
					const emptyLines = getEmptyLinesBetween(defaultImports[defaultImports.length - 1], namedImports[namedImports.length - 1], sourceCode)
					if (emptyLines !== 1) {
						isLinesOk = false
					}
				}

				// Проверка порядка импортов
				const expectedOrder = [...defaultImports, ...otherImports, ...namedImports];
				if (!arraysEqual(importDeclarations, expectedOrder) || !isLinesOk) {
					context.report({
						node: program,
						message: 'Импорты должны быть отсортированы.',
						fix: (fixer) => {
							const defaultImportsText = defaultImports.map((node) => sourceCode.getText(node)).join('\n');
							const otherImportsText = otherImports.map((node) => sourceCode.getText(node)).join('\n');
							const namedImportsText = namedImports.map((node) => sourceCode.getText(node)).join('\n');

							const importsText = [
								defaultImportsText,
								otherImportsText,
								namedImportsText,
							].filter(array => array.length).join('\n\n');

							return fixer.replaceTextRange([importDeclarations[0].range[0], importDeclarations[importDeclarations.length - 1].range[1]], importsText);
						},
					});
				}
			},
		}
	}
}


function arraysEqual(a, b) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}

function getEmptyLinesBetween (prevNode, currentNode, sourceCode) {
	const prevEnd = prevNode.loc.end.line;
	const currentStart = currentNode.loc.start.line;
	let emptyLines = 0;

	for (let i = prevEnd; i < currentStart; i++) {
		const line = sourceCode.lines[i];
		if (line.trim() === '') {
			emptyLines++;
		}
	}

	return emptyLines;
};

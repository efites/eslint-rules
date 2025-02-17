/** @type {import('eslint').Rule.RuleModule} */
export const linesAfterImports = {
	meta: {
		type: 'layout',
    docs: {
      description: 'Enforce a specific number of blank lines after the last import statement.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'integer',
        minimum: 0,
        default: 2,
      },
    ],
    messages: {
      linesAfterImport:
        'Expected {{expected}} blank lines after the last import statement, but found {{actual}}.',
    },
	},
	create(context) {
		const expectedLines = context.options[0] || 2;
		const sourceCode = context.getSourceCode();

		return {
			Program(node) {
				const importDeclarations = node.body.filter(
					(n) => n.type === 'ImportDeclaration'
				);

				if (importDeclarations.length === 0) {
					return;
				}

				const lastImport = importDeclarations[importDeclarations.length - 1];
				const nextToken = sourceCode.getTokenAfter(lastImport);

				if (!nextToken) {
					return;
				}

				const lastImportLine = lastImport.loc.end.line;
				const nextTokenLine = nextToken.loc.start.line;

				const actualLines = nextTokenLine - lastImportLine - 1;

				if (actualLines !== expectedLines) {
					context.report({
						node: lastImport,
						messageId: 'linesAfterImport',
						data: {
							expected: expectedLines,
							actual: actualLines,
						},
						fix(fixer) {
							const linesBetween = sourceCode.lines.slice(lastImportLine, nextTokenLine - 1);
							const range = [
								sourceCode.getIndexFromLoc({line: lastImportLine + 1, column: 0}),
								sourceCode.getIndexFromLoc({line: nextTokenLine, column: 0}),
							];
							const fixText = '\n'.repeat(expectedLines);
							return fixer.replaceTextRange(range, fixText);
						},
					});
				}
			},
		};
	}
}


function getEmptyLinesBetween(prevNode, nextNode, sourceCode) {
	const prevEnd = prevNode.loc.end.line;
	const nextStart = nextNode.loc.start.line;
	let emptyLines = 0;

	for (let i = prevEnd + 1; i < nextStart; i++) {
		const line = sourceCode.lines[i];
		if (line.trim() === '') {
			emptyLines++;
		}
	}

	return emptyLines;
}

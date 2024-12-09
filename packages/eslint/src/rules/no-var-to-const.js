/** @type {import('eslint').Rule.RuleModule} */
export const noVarToConst = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Replace var with const when variable is never reassigned',
			category: 'Best Practices',
			recommended: true,
		},
		fixable: 'code', // Указываем, что правило может автоматически исправлять код
		schema: [], // нет опций
		messages: {
			useConst: 'Use const instead of var for variables that are never reassigned.',
		},
	},

	create(context) {
		const sourceCode = context.getSourceCode();

		return {
			VariableDeclaration(node) {
				if (node.kind === 'var') {
				  context.report({
					node,
					messageId: 'useConst',
					fix(fixer) {
					  return fixer.replaceText(
						context.sourceCode.getFirstToken(node),
						'const'
					  );
					}
				  });
				}
			  }
		};
	}
}

/** @type {import('eslint').Rule.RuleModule} */
export const expressionToArrowFunction = {
	meta: {
		type: "suggestion",
		fixable: "code",
		docs: {
			description: "Convert function expressions to arrow functions",
			category: "ECMAScript 6",
			recommended: false,
		},
		schema: [],
	},
	create(context) {
		return {
			FunctionExpression(node) {
				// Проверяем, что функция не использует this, arguments, super или new.target

				context.report({
					node: node,
					message: "Используйте стрелочную функцию вместо FunctionExpression.",
					fix(fixer) {
						const source = context.sourceCode;
						const params = source.getText().slice(node.params[0]?.start || node.start, node.body.start);
						const body = source.getText().slice(node.body.start, node.body.end);
						return fixer.replaceText(node, `(${params}) => ${body}`);
					},
				});
			},
		};
	}
}

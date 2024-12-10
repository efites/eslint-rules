/** @type {import('eslint').Rule.RuleModule} */
export const consoleLogToInfo = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'Замена console.log() на другой метод консоли',
		},
		fixable: 'code',
		schema: [
			{
				type: 'object',
				properties: {
					replacementMethod: {
						type: 'string',
						enum: ['info', 'debug', 'warn', 'error']
					}
				},
				additionalProperties: false
			}
		],
	},

	create(context) {
		// Получаем метод замены из конфигурации, по умолчанию info
		const replacementMethod =
			(context.options[0] && context.options[0].replacementMethod) || 'info';

		return {
			CallExpression(node) {
				// Проверяем, является ли вызов console.log
				if (
					node.callee.type === 'MemberExpression' &&
					node.callee.object.name === 'console' &&
					node.callee.property.name === 'log'
				) {
					context.report({
						node,
						message: `Используйте console.${replacementMethod}() вместо console.log()`,
						fix: function (fixer) {
							// Формируем замену 'log' на 'info'
							const infoProperty = 'info';
							return fixer.replaceText(node.callee.property, infoProperty);
						}
					});
				}
			}
		};
	}
}

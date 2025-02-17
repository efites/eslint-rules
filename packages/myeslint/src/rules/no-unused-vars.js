/** @type {import('eslint').Rule.RuleModule} */
export const noUnusedVars = {
	meta: {
		type: "problem", // Возможные значения: "problem", "suggestion", "layout"
		docs: {
			description: "обнаруживает неиспользуемые переменные",
			category: "Variables",
			recommended: false, // Установите true, если хотите, чтобы правило было рекомендовано
		},
		schema: [], // Опишите схему опций, если правило их принимает
		messages: {
			unusedVar: "'{{name}}' определена, но никогда не используется, ептить.",
		},
	},
	create(context) {
		// Хранит все объявленные переменные
		const declared = new Map();
		// Хранит все использованные переменные
		const used = new Set();

		return {
			// Находим объявления переменных
			VariableDeclarator(node) {
				if (node.id.type === 'Identifier') {
					declared.set(node.id.name, {
						node: node,
						loc: node.loc,
					});
				}
			},

			// Находим объявления параметров функций
			FunctionDeclaration(node) {
				node.params.forEach(param => {
					if (param.type === 'Identifier') {
						declared.set(param.name, {
							node: param,
							loc: param.loc,
						});
					}
				});
			},

			// Находим использование переменных
			Identifier(node) {
				// Пропускаем объявления
				if (
					node.parent.type === 'VariableDeclarator' &&
					node.parent.id === node
				) {
					return;
				}

				// Пропускаем параметры функций
				if (
					node.parent.type === 'FunctionDeclaration' &&
					node.parent.params.includes(node)
				) {
					return;
				}

				used.add(node.name);
			},

			// В конце проверяем неиспользованные переменные
			'Program:exit'() {
				for (const [name, info] of declared) {
					if (!used.has(name)) {
						context.report({
							node: info.node,
							messageId: 'unusedVar',
							data: {
								name: name,
							},
						});
					}
				}
			},
		};
	}
}

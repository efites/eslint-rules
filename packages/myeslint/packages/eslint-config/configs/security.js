import tsParser from '@typescript-eslint/parser'
import sqlPlugin from 'eslint-plugin-sql'

export const security = () => {
	return {
		files: ['src/**/*.{jsx,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			sql: sqlPlugin,
		},
		rules: {
			'sql/format': [
				2,
				{
					ignoreExpressions: false,
					ignoreInline: true,
					ignoreTagless: true,
				},
			],
			'sql/no-unsafe-query': 'error'
		},
	}
}

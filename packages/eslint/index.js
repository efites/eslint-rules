//import type {Linter} from "eslint"
import globals from "globals"
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import js from "@eslint/js"
import {myRule} from "./custom/Rule.js"


export const eslint = (...config) => {
	const files = ["./src/**/*.jsx", "./src/**/*.js", "./src/**/*.tsx", "./src/**/*.ts"]

	const Global = {
		languageOptions: {
			globals: {
				...globals.browser
			}
		}
	}

	const Custom = {
		name: 'Custom rules',
		plugins: {
			
		},
		rules: {
			"my-rule": "error"
		},
	}

	const TypeScript = [
		...tseslint.configs.recommended,
		{
			name: 'TypeScript',
		}
	]

	const jsxA11y = [{
		name: 'jsx-accessibility',
		plugins: {
			'jsx-a11y': pluginJsxA11y,
		},
		rules: {
			...pluginJsxA11y.flatConfigs.recommended.rules,
		},
	}]

	const react = [{
		name: 'React',
		plugins: {
			'react': pluginReact,
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			'react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
	}]

	const JavaScript = [{
		name: 'JavaScript',
		rules: {
			...js.configs.recommended.rules,
		},
	}]

	const Imports = [{
		name: 'imports',
		plugins: {
			'plugin-simple-import-sort': pluginSimpleImportSort
		},
		rules: {
			//'sort-imports': 'off',
			'import/order': 'off',
			'import/extensions': 'off',
			'plugin-simple-import-sort/exports': 'error',
			'plugin-simple-import-sort/imports': [
				'error',
				{
					groups: [
						['^react', '^@?\\w'],
						['^@(([\\/.]?\\w)|assets|test-utils)'],
						['^\\u0000'],
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						['^.+\\.svg$'],
						['^.+\\.s?css$']
					]
				}
			]
		}
	}]

	config.push(Global, ...TypeScript, ...jsxA11y, ...react, ...JavaScript, ...Imports, Custom)

	return config
}

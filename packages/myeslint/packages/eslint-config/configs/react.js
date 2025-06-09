import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import tsParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';


export const react = () => {
	return {
		files: ["src/**/*.{jsx,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
			}
		},
		plugins: {
			'react': reactPlugin,
			'react-hooks': reactHooksPlugin,
			'@typescript-eslint': typescriptEslintPlugin,
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			...reactPlugin.configs.recommended.rules,
			...reactHooksPlugin.configs.recommended.rules,
			...typescriptEslintPlugin.configs.recommended.rules,
			"@typescript-eslint/explicit-member-accessibility": "error",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-fn-reference-in-iterator": "off",
			"unicorn/no-null": "off",
			"unicorn/prefer-query-selector": "off",
			"unicorn/prefer-node-protocol": "off",
			"unicorn/prevent-abbreviations": "off",
			"unicorn/no-useless-undefined": "off",



			complexity: ["error", 3],
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-vars": "off",
			'no-unused-vars': 'error'
		}
	}
}

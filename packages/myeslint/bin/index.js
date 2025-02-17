#!/usr/bin/env node
import {ESLint} from 'eslint';
import {eslint as config} from '../src/index.js';
import {server} from './server.js';



// Основная функция для запуска ESLint и React-приложения
async function main() {
	await lint()
	await server()
}

async function lint() {
	const eslint = new ESLint({baseConfig: config(), fix: true})
	const results = await eslint.lintFiles(["src/**/*.{js,jsx,ts,tsx}"])
	const formatter = await eslint.loadFormatter("stylish")
    const resultText = formatter.format(results)

	console.log(resultText)
}

main()
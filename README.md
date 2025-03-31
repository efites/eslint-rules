Как в express проверить занятость порта? Я запускаю сервер несколько раз на одинаковом порту и мне нужно игнорировать запуск, если приложение уже запущено






Тестирование ESLint Inspector

Для включения блока "Тестирование" в дипломную работу можно реализовать несколько простых, но эффективных типов тестов для вашего ESLint Inspector. Вот мои рекомендации:
1. Модульные тесты (Unit Tests)

Начните с тестирования отдельных функций в бэкенде:

// tests/analyzeFile.test.js
import { analyzeFile } from '../src/helpers/analyzeFile.js';
import path from 'path';

describe('analyzeFile', () => {
test('должен корректно анализировать файл', async () => {
const testFilePath = path.join(process.cwd(), 'tests/fixtures/sample.js');
const result = await analyzeFile(testFilePath);

    expect(result).toHaveProperty('errors');
    expect(result).toHaveProperty('warnings');
    expect(result).toHaveProperty('metrics');
    expect(result).toHaveProperty('path');
});

test('должен возвращать ошибку для несуществующего файла', async () => {
const nonExistentPath = '/non/existent/path';
await expect(analyzeFile(nonExistentPath)).rejects.toThrow();
});
});

2. Интеграционные тесты для API

Протестируйте API-эндпоинты:

// tests/treeApi.test.js
import request from 'supertest';
import express from 'express';
import { router } from '../src/routes/tree.js';

const app = express();
app.use('/', router);

describe('Tree API', () => {
test('GET / должен возвращать полное дерево файлов', async () => {
const response = await request(app).get('/');
expect(response.status).toBe(200);
expect(response.body).toHaveProperty('nodes');
expect(response.body).toHaveProperty('edges');
});

test('GET /:id должен возвращать информацию о конкретном файле', async () => {
// Используйте ID реального файла из вашего проекта
const fileId = 'some-valid-id';
const response = await request(app).get(`/${fileId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('errors');
    expect(response.body).toHaveProperty('warnings');
});
});

3. Компонентные тесты для React

Тестирование React-компонентов с помощью React Testing Library:

// app/src/components/FileNode/FileNode.test.tsx
import { render, screen } from '@testing-library/react';
import { FileNode } from './FileNode';

describe('FileNode', () => {
test('должен корректно отображать имя файла', () => {
const mockData = {
label: 'test.js',
type: 'file',
errors: 0,
warnings: 0
};

    render(<FileNode data={mockData} />);
    expect(screen.getByText('test.js')).toBeInTheDocument();
});

test('должен показывать количество ошибок', () => {
const mockData = {
label: 'test.js',
type: 'file',
errors: 5,
warnings: 0
};

    render(<FileNode data={mockData} />);
    expect(screen.getByText('5')).toBeInTheDocument();
});
});

4. Снэпшот-тестирование

Создайте снэпшот-тесты для компонентов:

// app/src/components/DirNode/DirNode.test.tsx
import { render } from '@testing-library/react';
import { DirNode } from './DirNode';

describe('DirNode', () => {
test('должен соответствовать снэпшоту', () => {
const mockData = {
label: 'src',
type: 'dir',
contentCount: 5,
errors: 0,
warnings: 0
};

    const { container } = render(<DirNode data={mockData} />);
    expect(container).toMatchSnapshot();
});
});

5. E2E тесты

Простой сквозной тест с помощью Cypress:

// cypress/e2e/inspector.cy.js
describe('ESLint Inspector', () => {
it('должен загружать дерево файлов', () => {
cy.visit('/');
cy.get('[data-testid="file-tree"]').should('exist');
cy.get('[data-testid="file-node"]').should('have.length.gt', 0);
});

it('должен открывать информацию о файле при клике', () => {
cy.visit('/');
cy.get('[data-testid="file-node"]').first().click();
cy.get('[data-testid="file-info-drawer"]').should('be.visible');
cy.get('[data-testid="close-drawer"]').click();
cy.get('[data-testid="file-info-drawer"]').should('not.be.visible');
});
});

Настройка тестирования

Добавьте необходимые зависимости в package.json:

{
"devDependencies": {
"jest": "^29.7.0",
"supertest": "^6.3.3",
"@testing-library/react": "^15.0.0",
"@testing-library/jest-dom": "^6.1.5",
"cypress": "^13.6.1"
},
"scripts": {
"test": "jest",
"test:watch": "jest --watch",
"test:e2e": "cypress run"
}
}

Заключение

Эти тесты охватывают основные аспекты вашего приложения:

    Модульные тесты для функций бэкенда
    Интеграционные тесты для API
    Компонентные тесты для React-компонентов
    Снэпшот-тестирование для UI
    E2E тесты для проверки работы приложения в целом

Такой подход обеспечит хорошее покрытие тестами, не требуя слишком сложной реализации, и будет отличным дополнением к дипломной работе.

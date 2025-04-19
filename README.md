Создать файл окружения .env и положить его в папки
- eslint-config-bun:
- eslint-config-bun/app

Файл должен содержать следующие переменные, в качестве примера:
```
VITE_SERVER_URL=http://localhost
VITE_SERVER_PORT=5566
VITE_WEBSOCKET_PORT=7890
```

Далее, необходимо связать ссылками конфиг eslint с проектом react (только при разработке)
```
cd packages/myeslint/packages/eslint-config
npm link
cd ../../../react
npm link @efites/eslint-config
```

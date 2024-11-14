require('dotenv').config({ path: '../../.env' });
const waitOn = require('wait-on');

const STORYBOOK_USER_NOTICE_TIMEOUT = 3000;
const STORYBOOK_NOT_RESPOND_TIMEOUT = 300000;

const urls = process.argv[2].split(',');

if (!process.env.GRID_URL || !process.env.GET_IP_URL) {
    error('Для запуска Creevey создайте в корне файл .env c переменными GRID_URL= и GET_IP_URL=');
    error('Подробнее: https://github.com/skbkontur/retail-ui/blob/next/contributing.md#скриншотные-тесты\n');
    process.exit(1);
}

info('Waiting Storybook...\n');

setTimeout(() => {
    info('Check Storybook is running parallel `yarn storybook:test`\n');
}, STORYBOOK_USER_NOTICE_TIMEOUT);

waitOn({
    resources: urls.map(url => `http-get://${url}`),
    timeout: STORYBOOK_NOT_RESPOND_TIMEOUT
}).then(() => {
    info('Storybook connected\n');
    process.exit(0);
}).catch((err) => {
    error(err);
    error('Для запуска требуется запущенный Storybook');
    error('Подробнее: https://github.com/skbkontur/retail-ui/blob/next/contributing.md#скриншотные-тесты\n');
    process.exit(1);
});

function info(text) {
    console.info(`\x1b[34mINFO\x1b[0m => ${text}`);
}

function error(text) {
    console.error(`\x1b[31mERROR\x1b[0m => ${text}`);
}

require('dotenv').config({ path: '../../.env' });
const waitOn = require('wait-on');
const config = require(`${process.cwd()}/${process.argv[2]}`);

const STORYBOOK_USER_NOTICE_TIMEOUT = 2000;
const STORYBOOK_NOT_RESPOND_TIMEOUT = 300000;

if (!process.env.GRID_URL || !process.env.GET_IP_URL) {
    error('Для запуска Creevey создайте в корне файл .env c переменными GRID_URL= и GET_IP_URL=');
    error('Подробнее: https://github.com/skbkontur/retail-ui/blob/next/contributing.md#скриншотные-тесты\n');
    process.exit(1);
}

info('Waiting Storybook...\n');

setTimeout(() => {
    warn('It looks like Storybook is not running!')
    warn(`Run Storybook via \`yarn storybook:test\` and check ${config.storybookUrl}\n`);
    info('Waiting Storybook...');
}, STORYBOOK_USER_NOTICE_TIMEOUT);

waitOn({
    resources: [config.storybookUrl],
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

function warn(text) {
    console.info(`\x1b[33mWARNING\x1b[0m => ${text}`);
}

function error(text) {
    console.error(`\x1b[31mERROR\x1b[0m => ${text}`);
}

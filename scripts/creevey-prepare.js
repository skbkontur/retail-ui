require('dotenv').config({ path: '../../.env' });
const path = require('path');

const waitOn = require('wait-on');
const config = require(path.join(path.dirname(`${process.cwd()}/${process.argv[2]}`), 'storybook-url.js'));

const STORYBOOK_NOT_RESPOND_TIMEOUT = 300000;
const STORYBOOK_RUN_COMMAND = 'yarn storybook:test';

if (!process.env.GRID_4_URL || !process.env.GET_IP_URL) {
    error('Для запуска Creevey создайте в корне файл .env c переменными GRID_URL= и GET_IP_URL=');
    error('Подробнее: https://github.com/skbkontur/retail-ui/blob/next/contributing.md#скриншотные-тесты\n');
    process.exit(1);
}

info(`Storybook should be started via \`${STORYBOOK_RUN_COMMAND}\` and be accessible at ${config.storybookUrl}`);
info('Waiting Storybook...');

waitOn({
    resources: [config.storybookUrl],
    timeout: STORYBOOK_NOT_RESPOND_TIMEOUT
}).then(() => {
    info('Storybook connected\n');
    process.exit(0);
}).catch((err) => {
    error(err);
    error(`Для запуска требуется запущенный Storybook через \`${STORYBOOK_RUN_COMMAND}\``);
    error('Подробнее: https://github.com/skbkontur/retail-ui/blob/next/contributing.md#скриншотные-тесты\n');
    process.exit(1);
});

function info(text) {
    console.info(`\x1b[34mINFO\x1b[0m => ${text}`);
}

function error(text) {
    console.error(`\x1b[31mERROR\x1b[0m => ${text}`);
}

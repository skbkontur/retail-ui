require('dotenv').config({ path: '../../.env' });

const axios = require('axios');

const port = 6060;

exports.storybookUrl = `http://${process.env.CONTAINER_IP || 'localhost'}:${port}`;
exports.resolveStorybookUrl = process.env.GET_IP_URL
  ? () => axios(process.env.GET_IP_URL).then((res) => `http://${res.data}:${port}`)
  : undefined;

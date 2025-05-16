require('dotenv').config({ path: '../../.env' });

const axios = require('axios');

const port = 6060;

const resolveStorybookUrl = () => {
  const IP_FROM_ENV = process.env.CONTAINER_IP;
  const url = IP_FROM_ENV ? `http://${IP_FROM_ENV}:${port}` : `http://localhost:${port}`;
  console.log('[Creevey] Resolved Storybook URL:', url);
  return url;
};

exports.storybookUrl = resolveStorybookUrl();
exports.resolveStorybookUrl = process.env.GET_IP_URL
  ? () => axios(process.env.GET_IP_URL).then((res) => `http://${res.data}:${port}`)
  : undefined;

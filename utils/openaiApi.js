const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

const configuration2 = new Configuration({
  apiKey: `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`
});
const openai2 = new OpenAIApi(configuration);

module.exports = {openai, openai2};



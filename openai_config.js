const openaiPackage = require("openai");
require("dotenv").config()

const configuration = new openaiPackage.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new openaiPackage.OpenAIApi(configuration);

module.exports = { openai };
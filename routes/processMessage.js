const express = require('express');
const openaiPackage =  require('openai');
const axios = require('axios');
require("dotenv").config();

const app = express();
const port = 3000;
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { sourceText, targetLanguage } = req.body;

    const configuration = new openaiPackage.Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new openaiPackage.OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Translate this text from English to ${targetLanguage}: ${sourceText}`,
        temperature: 0.3,
        max_tokens: 2048,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    res.send({ translation: completion.data.choices.length > 0 ? completion.data.choices[0].text : "Message can not be translated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
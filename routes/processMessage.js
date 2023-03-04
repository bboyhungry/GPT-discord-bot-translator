const express = require('express');
const axios = require('axios');
const { openai } = require("../openai_config.js");
const { DEFAULT_LANGUAGE } = require("../config.js");
require("dotenv").config();

const app = express();
const port = 3000;
app.use(express.json());

app.post('/translate', async (req, res) => {
  try {
    const { userMessage } = req.body;

    const regEx = /<(.*?)>/g;

    // Regular expression that will capture strings like <string> <string> or <string>
    const correctFormatRegEx = /^<.+?> <.+?>$|^<.+?>/;
    const correctFormat = userMessage.match(correctFormatRegEx);

    if (!correctFormat){
      console.error("Incorrect format");
      res.status(400).send({ translation: "Whoopsie daisy! " + 
      "It looks like you didn't enter the correct format. " + 
      "Let's try this again, shall we? " + 
      "It should be !translate <source text> <target language>. " + 
      "And no extra nonsense, please." });
      return;
    }

    const textAndLanguageMatches = userMessage.match(regEx);

    // parse out the source text and the target language from the user message
    const [sourceText, targetLanguage] = textAndLanguageMatches.map(match => match.replace(/<|>/g, ''));

    const completion = await openai.createCompletion({
        // The ID of the language model to use for text generation
        // List of GPT-3 models: https://platform.openai.com/docs/models/gpt-3
        model: "text-davinci-003",
        // The prompt to provide to the model
        prompt: `Translate the following text to ${targetLanguage ? `${targetLanguage}` : `${DEFAULT_LANGUAGE}` }: ${sourceText}`,
        // Controls the creativity/diversity of the generated text
        temperature: 0.3,
        // The maximum number of tokens (words) to generate in the response
        max_tokens: 2048,
        // Controls the probability of each generated token
        top_p: 1.0,
        // Controls the impact of token frequency on the generated text
        frequency_penalty: 0.0,
        // Controls the impact of token presence on the generated text
        presence_penalty: 0.0,
    });

    res.status(500).send({ translation: completion.data.choices.length > 0 ? completion.data.choices[0].text : "Message can not be translated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
const { discordCommand } = require("./global.js");

require("dotenv").config();

const axios = require('axios');

// Load english language model — light version.
const winkNLP = require('wink-nlp');
// Load english language model — light version.
const model = require('wink-eng-lite-web-model');

const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

function parseMessage(message) {
  // Instantiate winkNLP.
  const nlp = winkNLP(model);

  // Obtain "its" helper to extract item properties.
  const its = nlp.its;

  // Obtain "as" reducer helper to reduce a collection.
  const as = nlp.as;

  const doc = nlp.readDoc(message);
  const tokens = doc.tokens().out();
  tokens.shift();
  return (tokens.toString());
}

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", async message => {
  // Check if the message is from a user (not another bot)
  if (message.author.bot) return;

  if (message.content.startsWith(discordCommand)) {
    try {
      // split the user message
      const originalMessage = message.content.split(" ");

      // last substring of the string which is going to be the language
      const targetLanguage = originalMessage.pop();
      
      // remove the first element, which is going to be the discord command
      originalMessage.shift();

      const sourceText = originalMessage.join(" ");

      const response = await axios.post('http://localhost:3000/translate', {
        sourceText,
        targetLanguage,
      });
      message.reply(response.data.translation);
    } catch (error) {
      console.error(error);
    }
  }
});

client.login(process.env.DISCORD_API_KEY);
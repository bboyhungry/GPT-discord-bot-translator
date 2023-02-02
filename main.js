require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  // console.log(message);
  if (message.content === "!hello") {
    message.reply("Hello world!");
  }
  else if (message.content === "!steven"){
    message.reply("Steven is jacking off");
  }
  else if (message.content === "!tommy"){
    message.reply("yk yk");
  }
});

client.login(process.env.DISCORD_API_KEY);
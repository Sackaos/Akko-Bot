// IMPORTS MODULES
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

//IMPORT CUSTOM MODULES
const { messageHandler } = require("./handlers/messageHandler");
const emojiHandler = require("./handlers/emojiHandler");
const discordUtility = require("./discordUtility");

// MAIN
const mainDiscord = () => {
  const clientKey = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../discordKey.json"))
  ).key;

  const client = new Discord.Client();

  client.once("ready", () => {
    // TODO: decomment when depolying bot
    // discordUtility.sendMsgToChannel(client, "I am online again!");
  });

  client.on("message", (messageObj) => messageHandler(messageObj));

  client.on("emojiCreate", (emoji) =>
    emojiHandler.emojiCreateHandler(emoji, client)
  );

  client.on("emojiDelete", (emoji) => {
    emojiHandler.emojiDeleteHandler(emoji, client);
  });

  client.on("emojiUpdate", (oldEmoji, newEmoji) => {
    emojiHandler.emojiUpdateHandler(oldEmoji, newEmoji, client);
  });

  client.login(clientKey);
};

mainDiscord();

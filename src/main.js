// IMPORTS MODULES
const Discord = require("discord.js");

//IMPORT CUSTOM MODULES
const { messageHandler } = require("./handlers/messageHandler");
const emojiHandler = require("./handlers/emojiHandler");
const discordUtility = require("./discordUtility");

const data = require("./data.js");

// MAIN
const mainDiscord = () => {
  const clientKey = data.BOT_TOKEN;

  const client = new Discord.Client();

  // INIT LISTENER
  client.once("ready", () => {
    discordUtility.sendMessageToChannel(
      client,
      `${data.BOT_NAME} lives!`,
      data.LOGGER_CHANNEL
    );
    console.log(`${data.BOT_NAME} is ready!`);
  });

  // MESSAGE LISTENER
  client.on("message", (message) => {
    messageHandler(message, client);
  });

  client.on("messageDelete", (message) => {
    if (!message.author.bot) data.saveMessageToDatabase(message);
  });

  //EMOJI LISTENER
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

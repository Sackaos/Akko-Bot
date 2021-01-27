const Discord = require("discord.js");
const fs = require("fs");

const messageHandler = require("./messageHandler");

const newEmojiHandler = (emojiObj, client) => {
  client.channels.cache
    .get("744314896468148318")
    .send(
      "new emoji has been added! <:" + emojiObj.name + ":" + emojiObj.id + ">"
    );
};

const mainDiscord = () => {
  const clientKey = JSON.parse(fs.readFileSync("../discordKey.json")).key;

  const client = new Discord.Client();

  client.once("ready", () => {
    console.log("I am online again!");
  });

  client.on("message", (messageObj) => messageHandler(messageObj));

  client.on("emojiCreate", (newEmoji) => newEmojiHandler(newEmoji, client));

  client.login(clientKey);
};

mainDiscord();

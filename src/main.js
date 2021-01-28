// IMPORTS MODULES
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

//IMPORT CUSTOM MODULES
const { messageHandler } = require("./handlers/messageHandler");
const emojiHandler = require("./handlers/emojiHandler");
const discordUtility = require("./discordUtility");

const DATAJSON_PATH = path.join(__dirname, "../../", "data.json");

const saveMsg2Database = (msg) => {
  fs.readFile(DATAJSON_PATH, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //now it an object
      obj = JSON.parse(data);
      //add some data
      const { reference, author, content } = msg;
      const {
        id,
        username,
        bot,
        avatar,
        createdTimestamp,
        tag,
        displayAvatarURL,
      } = author;
      obj.history.push({
        reference,
        author: {
          id,
          username,
          bot,
          avatar,
          createdTimestamp,
          tag,
          displayAvatarURL,
        },
        content,
      });
      json = JSON.stringify(obj); //convert it back to json

      fs.writeFile(DATAJSON_PATH, json, "utf8", (err) => {}); // write it back
    }
  });
};

const loadMsgHistory = () => {
  return JSON.parse(fs.readFileSync(DATAJSON_PATH, "utf8", (err, data) => {}))
    .history;
};

const deleteHistoryData = () => {
  fs.readFile(DATAJSON_PATH, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //now it an object
      obj = JSON.parse(data);
      //add some data
      obj.history = [];
      json = JSON.stringify(obj); //convert it back to json

      fs.writeFile(DATAJSON_PATH, json, "utf8", (err) => {}); // write it back
    }
  });
};

// MAIN
const mainDiscord = () => {
  const clientKey = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../discordKey.json"))
  ).key;

  const client = new Discord.Client();

  client.once("ready", () => {
    discordUtility.sendMsgToChannel(
      client,
      "Akko lives!",
      discordUtility.LOGGER_CHANNEL
    );
    console.log("Akko is ready!");
  });

  // MESSAGE LISTENER
  client.on("message", (message) => {
    const historyArr = loadMsgHistory();
    messageHandler(message, client, {
      msgHistory: historyArr,
      deleteHistoryData: deleteHistoryData,
    });
  });

  client.on("messageDelete", (message) => {
    if (!message.author.bot) saveMsg2Database(message);
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

  //MISC

  client.login(clientKey);
};

mainDiscord();

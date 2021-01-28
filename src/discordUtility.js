const fs = require("fs");
const path = require("path");

//TEMP
// const sendImage = () => {
//   messageObj.channel.send("img", {
//     embed: {
//       author: {
//         iconURL: "",
//         username: "Sackaos",
//         url: "https://discordapp.com/users/358089430814162945",
//       },
//       description: "desc descd esccsd",
//       type: "article",
//       color: 1000,
//       title: "poop man",
//       thumbnail: {
//         url:
//           "https://www.metalmetal.co.il/wp-content/uploads/2019/03/skull-icon.jpg",
//       },
//       files: [
//         {
//           attachment: "img.png",
//           name: "img.png",
//         },
//       ],
//     },
//   });
// };

// PRIVATE FUNCTION
const loadChannelsJson = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "../", "config.json")))
    .channels;
};

const retrieveServerId = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../", "discordKey.json"))
  ).serverID;
};

// CHANNELS
const LOGGER_CHANNEL = loadChannelsJson().logger;
const MAIN_CHANNEL = loadChannelsJson().main;
const SPAM_CHANNEL = loadChannelsJson().spam;

// SERVER
const SERVER_ID = retrieveServerId();

//PUBLIC FUNCTION
const sendMsgToChannel = (client, msg, channel = LOGGER_CHANNEL) => {
  client.channels.cache.get(channel).send(msg);
};

module.exports = {
  sendMsgToChannel,
  LOGGER_CHANNEL,
  MAIN_CHANNEL,
  SPAM_CHANNEL,
  SERVER_ID,
};

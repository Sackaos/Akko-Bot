const fs = require("fs");
const path = require("path");

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

const fs = require("fs");
const path = require("path");

const loadChannelsJson = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "../", "data.json")))
    .channels;
};

const LOGGER_CHANNEL = loadChannelsJson().logger;
const MAIN_CHANNEL = loadChannelsJson().main;
const SPAM_CHANNEL = loadChannelsJson().spam;

const sendMsgToChannel = (client, msg, channel = LOGGER_CHANNEL) => {
  client.channels.cache.get(channel).send(msg);
};

module.exports = {
  sendMsgToChannel,
  LOGGER_CHANNEL,
  MAIN_CHANNEL,
  SPAM_CHANNEL,
};

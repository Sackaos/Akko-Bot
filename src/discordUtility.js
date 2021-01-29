const data = require("./data.js");

// PRIVATE FUNCTION

//PUBLIC FUNCTION
const sendMessageToChannel = (client, msg, channel = data.LOGGER_CHANNEL) => {
  client.channels.cache.get(channel).send(msg);
};

module.exports = {
  sendMessageToChannel,
};

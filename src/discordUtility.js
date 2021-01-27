const sendMsgToChannel = (client, msg, channel = "745259101130457139") => {
  client.channels.cache.get(channel).send(msg);
};

module.exports = { sendMsgToChannel };

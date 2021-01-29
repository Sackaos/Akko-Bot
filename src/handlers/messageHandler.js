const commandHandler = require("./commandHandler");
const data = require("../data");

// PRIVATE METHODS
const getMessageResponse = (msg) => {
  const messagesJSON = data.loadMessagesData();
  let filteredResponses = messagesJSON.filter((message) => {
    if (message.response.includes)
      return msg.includes(message.request.toLowerCase());
    else return message.request.toLowerCase() === msg;
  });

  return filteredResponses[0]?.response.text;
};

const isCmd = (msg, prefix) => {
  msg = msg.toLowerCase();
  prefix = prefix.toLowerCase();
  if (
    msg.startsWith(prefix) &&
    msg.length > prefix.length &&
    msg[prefix.length + 1] !== " "
  )
    return true;
  else return false;
};

// PUBLIC METHODS
const messageHandler = (messageObj, client) => {
  const msgText = messageObj.content;

  //If the message is from the bot - bail out.
  if (messageObj.author.bot) return;

  // === HANDLE COMMAND REQUEST ===
  const cmdPrefixes = data.BOT_PREFIXES;
  for (let i = 0; i < cmdPrefixes.length; i++) {
    const cmdPrefix = cmdPrefixes[i];

    if (isCmd(msgText, cmdPrefix)) {
      //delete the prefix from the msgText
      let cmdNoPrefix = msgText.slice(cmdPrefix.length);

      // if starts with a white space delete it
      if (cmdNoPrefix[0] === " ") cmdNoPrefix = cmdNoPrefix.slice(1);

      commandHandler.commandHandler(cmdNoPrefix, messageObj, client);
      return;
    }
  }
  // === HANDLE MESSAGE REQUEST ===
  const response = getMessageResponse(msgText.toLowerCase());
  if (response) messageObj.channel.send(response);
};

module.exports = { messageHandler };

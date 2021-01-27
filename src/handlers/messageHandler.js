const fs = require("fs");
const path = require("path");

const commandHandler = require("./commandHandler");

const loadMessagesJson = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../", "data.json"))
  ).messages;
};

const getMsgResponse = (msg) => {
  const messagesJSON = loadMessagesJson();

  let filteredResponses = messagesJSON.filter((message) => {
    if (message.response.includes) return msg.includes(message.request);
    else return message.request === msg;
  });

  return filteredResponses[0]?.response.text;
};

const messageHandler = (messageObj) => {
  //If the message is from the bot - bail out.
  if (messageObj.author.bot) return;

  const cmdPrefix = "~";
  // Checks if this is a bot cmd -- starts with the cmdPrefix
  if (
    messageObj.content.startsWith(cmdPrefix) &&
    messageObj.content.length > 1
  ) {
    let cmdNoPrefix = messageObj.content.slice(cmdPrefix.length);
    if (cmdNoPrefix[0] === " ") cmdNoPrefix = cmdNoPrefix.slice(1);

    commandHandler.cmdHandler(cmdNoPrefix, messageObj);
  } else {
    const resp = getMsgResponse(messageObj.content.toLowerCase());
    if (resp) messageObj.channel.send(resp);
  }
};

module.exports = { messageHandler };

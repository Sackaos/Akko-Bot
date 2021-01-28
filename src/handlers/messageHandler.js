const fs = require("fs");
const path = require("path");

const commandHandler = require("./commandHandler");

const loadMessagesJson = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../", "config.json"))
  ).messages;
};

const retrivePrefix = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../", "config.json"))
  ).misc.botPrefix;
};

const retrieveMsgResponse = (msg) => {
  const messagesJSON = loadMessagesJson();

  let filteredResponses = messagesJSON.filter((message) => {
    if (message.response.includes)
      return msg.includes(message.request.toLowerCase());
    else return message.request.toLowerCase() === msg;
  });

  return filteredResponses[0]?.response.text;
};

const messageHandler = (messageObj, client, miscObj) => {
  const msgText = messageObj.content;

  //If the message is from the bot - bail out.
  if (messageObj.author.bot) return;

  const cmdPrefix = retrivePrefix();

  // Checks if this is a bot cmd -- starts with the cmdPrefix
  if (isCmd(msgText, cmdPrefix)) {
    //delete the prefix from the msgText
    let cmdNoPrefix = msgText.slice(cmdPrefix.length);

    // if starts with a white space delete it
    if (cmdNoPrefix[0] === " ") cmdNoPrefix = cmdNoPrefix.slice(1);

    commandHandler.cmdHandler(cmdNoPrefix, messageObj, client, miscObj);
  } else {
    const response = retrieveMsgResponse(msgText.toLowerCase());
    if (response) messageObj.channel.send(response);
    messageObj.channel.send("img", {
      embed: {
        author: {
          iconURL: "",
          username: "Sackaos",
          url: "https://discordapp.com/users/358089430814162945",
        },
        description: "desc descd esccsd",
        type: "article",
        color: 1000,
        title: "poop man",
        thumbnail: {
          url:
            "https://www.metalmetal.co.il/wp-content/uploads/2019/03/skull-icon.jpg",
        },
        files: [
          {
            attachment: "img.png",
            name: "img.png",
          },
        ],
      },
    });
  }
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

module.exports = { messageHandler };

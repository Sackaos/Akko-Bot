const data = require("../../data");

const lastCmdHandler = async (args, messageObj, client) => {
  const messagesHistory = data.loadMessageHistory();
  if (!messagesHistory.length) {
    messageObj.channel.send("Sorry, i have no memory of stuff like that");
    return;
  }
  // TODO: connect to config.json arguments here is hard coded -- -a --all
  // Get the number of step to go back
  let argOne = args[0];
  if (argOne == "--all" || argOne == "-a") {
    argOne = messagesHistory.length;
  } else if (isNaN(argOne)) {
    messageObj.channel.send(`'${argOne}' is not valid. defaulting to 1:`);
    argOne = 1;
  }
  // if step is undefiend or 0 do only one step
  argOne = argOne ? argOne : 1;
  // if step exeeced the length of history  go to length
  argOne = argOne > messagesHistory.length ? messagesHistory.length : argOne;

  let allMsgArr = [];
  for (
    let i = messagesHistory.length - argOne;
    i < messagesHistory.length;
    i++
  ) {
    let reply = "";
    if (messagesHistory[i].reference) {
      const { messageID, channelID } = messagesHistory[i].reference;

      reply = await client.channels.cache
        .get(channelID)
        .messages.fetch(messageID)
        .then((message) => message.author.username + ": " + message.content)
        .catch((err) => "*[deleted reply]*");
    }
    let tempMsg = reply ? `> *${reply}*\n` : "";
    tempMsg +=
      (reply ? `> ↳\t` : `> `) +
      `**${messagesHistory[i].author.username}:** ${messagesHistory[i].content}\n`;
    tempMsg += "--------------------\n";
    allMsgArr.push(tempMsg);
  }
  messageObj.channel.send(allMsgArr.join(""));
};

module.exports = { lastCmdHandler };

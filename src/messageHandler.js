const fs = require("fs");

const getCmdOfArgs = (arrArgs, cmdName) => {
  for (let i = 0; i < arrArgs.length; i++) {
    const arg = arrArgs[i];
    if (arg.name === cmdName) return arg;
  }
  return null;
};

const helpCmd = (args) => {
  let rawdata = fs.readFileSync("./help.json");
  let parseddata = JSON.parse(rawdata);
  let helpData = parseddata.help;

  if (args.length) {
    let resp = "";
    const argData = getCmdOfArgs(helpData.arguments, args[0]);
    if (argData) {
      resp += `**${argData.name}** -- *${argData.description}*\n`;
      resp += "Children:\n";
      for (let i = 0; i < argData.arguments.length; i++) {
        const arg = argData.arguments[i];
        resp += `**${arg.name}** -- *${arg.description}*\n`;
      }
    } else {
      return `${args[0]} is not valid`;
    }
    return resp;
  } else {
    let resp = helpData.description + "\n";
    for (let i = 0; i < helpData.arguments.length; i++) {
      resp += `**${helpData.arguments[i].name}** -- *${helpData.arguments[i].description}*\n`;
    }
    return resp;
  }
};

const cmdHandler = (cmd, messageObj) => {
  //split to args and deletes duplicates
  const args = cmd.split(/ +/);

  // get the first arg -- the cmd, and now hte @args have the other tokens
  const command = args.shift().toLowerCase();

  switch (command) {
    case "help":
      const resp = helpCmd(args);
      messageObj.channel.send(resp);
      break;
    case "p":
      messageObj.channel.send(`Now playing the ${args[0]} song! Enjoy!`);
      break;
    default:
      messageObj.channel.send(
        `'${command}' is not a command for Akko, you fool!`
      );
  }
};

const getMsgResponse = (msg) => {
  switch (msg) {
    case "ping":
      return "pong";
    case "hehe":
      return "***ehe te nandayo***".toUpperCase();
    case "ehe te nandayo":
      return "***thats my phrase***  ".toUpperCase() + ":anger:";
    case "thats my phrase":
      return "thats it im out";
    default:
      return "";
  }
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

    cmdHandler(cmdNoPrefix, messageObj);
  } else {
    const resp = getMsgResponse(messageObj.content.toLowerCase());
    if (resp) messageObj.channel.send(resp);
  }
};

module.exports = { messageHandler };

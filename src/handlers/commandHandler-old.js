const fs = require("fs");
const path = require("path");

const loadHelpJson = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../data/", "config.json"))
  ).help;
};

const getCmdOfArgs = (arrArgs, cmdName) => {
  for (let i = 0; i < arrArgs.length; i++) {
    const arg = arrArgs[i];
    if (arg.name === cmdName) return arg;
  }
  return null;
};

const helpcommandHandler = (args) => {
  let helpJSON = loadHelpJson();

  if (args.length) {
    let resp = "";
    const argData = getCmdOfArgs(helpJSON.arguments, args[0]);
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
    let resp = helpJSON.description + "\n";
    for (let i = 0; i < helpJSON.arguments.length; i++) {
      resp += `**${helpJSON.arguments[i].name}** -- *${helpJSON.arguments[i].description}*\n`;
    }
    return resp;
  }
};

const lastMsgCmd = async (args, messageObj, client, miscObj) => {
  if (!miscObj.msgHistory.length) {
    messageObj.channel.send("Sorry, i have no memory of stuff like that");
    return;
  }
  // Get the number of step to go back
  let argOne = args[0];
  if (argOne == "--all" || argOne == "-a") {
    argOne = miscObj.msgHistory.length;
  } else if (isNaN(argOne)) {
    messageObj.channel.send(`'${argOne}' is not valid. defaulting to 1:`);
    argOne = 1;
  }
  // if step is undefiend or 0 do only one step
  argOne = argOne ? argOne : 1;
  // if step exeeced the length of history  go to length
  argOne =
    argOne > miscObj.msgHistory.length ? miscObj.msgHistory.length : argOne;

  let allMsgArr = [];
  for (
    let i = miscObj.msgHistory.length - argOne;
    i < miscObj.msgHistory.length;
    i++
  ) {
    let reply = "";
    if (miscObj.msgHistory[i].reference) {
      const { messageID, channelID } = miscObj.msgHistory[i].reference;

      reply = await client.channels.cache
        .get(channelID)
        .messages.fetch(messageID)
        .then((message) => message.author.username + ": " + message.content)
        .catch((err) => "*[deleted reply]*");
    }
    let tempMsg = reply ? `> *${reply}*\n` : "";
    tempMsg +=
      (reply ? `> ↳\t` : `> `) +
      `**${miscObj.msgHistory[i].author.username}:** ${miscObj.msgHistory[i].content}\n`;
    tempMsg += "--------------------\n";
    allMsgArr.push(tempMsg);
  }
  messageObj.channel.send(allMsgArr.join(""));
};

const commandHandler = (cmd, messageObj, client, miscObj) => {
  //split to args and deletes duplicates
  const args = cmd.split(/ +/);

  // get the first arg -- the cmd, and now hte @args have the other tokens
  const command = args.shift().toLowerCase();

  switch (command) {
    case "help":
      const response = helpcommandHandler(args);
      messageObj.channel.send(response);
      break;
    case "hello":
      messageObj.channel.send("domo arigato.");
      break;
    case "p":
      messageObj.channel.send(`Now playing the ${args[0]} song! Enjoy!`);
      break;
    case "last":
      lastMsgCmd(args, messageObj, client, miscObj);
      break;
    case "delete":
      if (args[0] == "history") {
        if (messageObj.author.id == "358089430814162945") {
          messageObj.channel.send("Yes, Master!");
          miscObj.deleteHistoryData();
        } else {
          // console.log(messageObj.author);
          messageObj.author
            .createDM()
            .then((client, data) => {
              client.messages.channel.send("Pooke . . .").then((msg) => {
                console.log(msg.delete({ timeout: 3000 }));
              });
            })
            .catch((err) => console.log(err));
        }
      } else {
        messageObj.channel.send(
          `**${command}** is not a command for Akko, you fool!`
        );
      }
      break;
    case "":
      messageObj.channel.send(`This is not a command for Akko, you fool!`);
      break;
    default:
      messageObj.channel.send(
        `**${command}** is not a command for Akko, you fool!`
      );
  }
};

module.exports = { commandHandler };

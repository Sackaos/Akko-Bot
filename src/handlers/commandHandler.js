const data = require("../data");
const { statusCmdHandler } = require("./commands/status");
const { helpCmdHandler } = require("./commands/help");
const { derpyfaceCmdHandler } = require("./commands/derpyface");
const { lastCmdHandler } = require("./commands/last");
const { deleteCmdHandler } = require("./commands/delete");

//PRIVATE METHODS
const parseCommand = (cmd) => {
  //split to args and lowercase all
  const args = cmd.split(/ +/).map((arg) => arg.toLowerCase());
  // get the first arg -- the cmd, and now hte @args have the other tokens
  const command = args.shift();
  return { command, args };
};

const callAppropirateCmdHandler = (cmdName, args, messageObj, client) => {
  switch (cmdName) {
    case "help":
      helpCmdHandler(args, messageObj);
      break;
    case "status":
      statusCmdHandler(args, messageObj);
      break;
    case "derpyface":
      derpyfaceCmdHandler(args, messageObj);
      break;
    case "last":
      lastCmdHandler(args, messageObj, client);
      break;
    case "delete":
      deleteCmdHandler(args, messageObj);
      break;
  }
};

const commandDispatcher = ({ command, args }, messageObj, client) => {
  const commandsData = data.loadCommandsData();

  for (let i = 0; i < commandsData.length; i++) {
    const commandData = commandsData[i];
    if (commandData.commands.includes(command)) {
      callAppropirateCmdHandler(commandData.name, args, messageObj, client);
      return;
    }
  }
  messageObj.channel.send(
    `**${command}** is not a command for ${data.BOT_NAME}, you fool!`
  );
};

//PUBLIC METHODS
const commandHandler = (cmd, messageObj, client) => {
  const cmdArgs = parseCommand(cmd);
  commandDispatcher(cmdArgs, messageObj, client);
};

module.exports = { commandHandler };

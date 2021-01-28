const data = require("../data");

//PRIVATE METHODS
const parseCommand = (cmd) => {
  //split to args and lowercase all
  const args = cmd.split(/ +/).map((arg) => arg.toLowerCase());
  // get the first arg -- the cmd, and now hte @args have the other tokens
  const command = args.shift();
  return { command, args };
};

const commandDispatcher = (cmd, args) => {
  const commandsData = data.loadCommandsData();

  for (let i = 0; i < commandsData.length; i++) {
    const commandData = commandsData[i];
    if (commandData.commands.includes(cmd)) {
      console.log("you asked for ", commandData.name);
      return;
    }
  }
  console.log("cmd not found -- ", cmd);
};

//PUBLIC METHODS
const commandHandler = (cmd, messageObj, client) => {
  const { command, args } = parseCommand(cmd);
  commandDispatcher(command, args);
};

module.exports = { commandHandler };

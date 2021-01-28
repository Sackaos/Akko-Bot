const data = require("../../data");

const getCmdData = (cmdName) => {
  commandsData = data.loadCommandsData();
  for (let i = 0; i < commandsData.length; i++) {
    const cmdData = commandsData[i];
    if (cmdData.name == cmdName) {
      return cmdData;
    }
  }
  return null;
};

const helpCmdHandler = (args, messageObj) => {
  if (args.length) {
  } else {
    const cmdData = getCmdData("help");
    let response = cmdData.doc;
    if (args.includs("-v")) {
      response += "\n" + cmdData.docExt;
    }
    response += "\n**Usage:** " + cmdData.usage;
    messageObj.channel.send(response);
  }
};

module.exports = { helpCmdHandler };

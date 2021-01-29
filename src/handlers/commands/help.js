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

const parseUsage = (usageText, cmdName) => {
  const firstPrefix = data.BOT_PREFIXES[0];
  let parsed = "";
  parsed = usageText.replace("|prefix|", firstPrefix);
  parsed = parsed.replace("|name|", cmdName);
  return parsed;
};

const helpCmdHandler = (args, messageObj) => {
  const cmdData = getCmdData("help");
  let response = cmdData.doc;
  if (args.includes("-v")) {
    response += "\n" + cmdData.docExt;
  }
  response += "\n**Usage:** " + cmdData.usage;

  commandsData = data.loadCommandsData();
  response += "\n";
  for (let i = 0; i < commandsData.length; i++) {
    const cmd = commandsData[i];
    response += `\t**${cmd.name}**\t\`${cmd.commands.join(" | ")}\`\t${
      cmd.doc
    }`;
    response +=
      args.includes("-v") && cmd.docExt != "" ? `\n\t${cmd.docExt}` : "";
    response += `\n\t**Usage:** ${parseUsage(cmd.usage, cmd.commands[0])}`;
    response += "\n\n";
  }
  messageObj.channel.send(response);
};

module.exports = { helpCmdHandler };

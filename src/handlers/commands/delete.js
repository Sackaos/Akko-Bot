const data = require("../../data");

const isIdRole = (id, roleType) => {
  const rolesData = data.loadRolesData();
  for (let i = 0; i < rolesData.length; i++) {
    const roleData = rolesData[i];
    if (roleData.id == id && roleData.type == roleType) {
      return true;
    }
  }
  return false;
};

const deleteCmdHandler = (args, messageObj) => {
  if (args[0] == "history") {
    if (isIdRole(messageObj.author.id, "admin")) {
      messageObj.channel.send("Yes, Master!");
      data.deleteHistoryData();
    } else {
      messageObj.author
        .createDM()
        .then((client, data) => {
          client.messages.channel.send("Pookie . . .").then((msg) => {
            console.log(msg.delete({ timeout: 5000 }));
          });
        })
        .catch((err) => console.log(err));
    }
  } else {
    messageObj.channel.send(
      `**${command}** is not a command for Akko, you fool!`
    );
  }
};

module.exports = { deleteCmdHandler };

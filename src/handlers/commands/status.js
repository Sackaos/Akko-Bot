const { loadRolesData, BOT_NAME } = require("../../data");

const statusCmdHandler = (args, messageObj) => {
  const rolesData = loadRolesData();
  for (let i = 0; i < rolesData.length; i++) {
    const roleData = rolesData[i];
    if (messageObj.author.id === roleData.id) {
      let response = "";
      switch (roleData.type) {
        case "admin":
          response += `Ohh a little baby admin!`;
          break;
        case "superadmin":
          response += `${roleData.name}-dono! I will do as you command!`;
          break;
        case "developer":
          response += `My Lord! My Creator! I'm just a ${data.BOT_NAME} for you!`;
          break;
        case "baby":
          response += `Pookie!`;
          break;
      }
      response += `\nYour status is: ${roleData.type}`;
      messageObj.channel.send(response);
      return;
    }
  }
  messageObj.channel.send(
    `You're not an admin, so got eat some camelCase iceCream!`
  );
};

module.exports = { statusCmdHandler };

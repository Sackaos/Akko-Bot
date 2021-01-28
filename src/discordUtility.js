const data = require("./data.js");

//TEMP
// const sendImage = () => {
//   messageObj.channel.send("img", {
//     embed: {
//       author: {
//         iconURL: "",
//         username: "Sackaos",
//         url: "https://discordapp.com/users/358089430814162945",
//       },
//       description: "desc descd esccsd",
//       type: "article",
//       color: 1000,
//       title: "poop man",
//       thumbnail: {
//         url:
//           "https://www.metalmetal.co.il/wp-content/uploads/2019/03/skull-icon.jpg",
//       },
//       files: [
//         {
//           attachment: "img.png",
//           name: "img.png",
//         },
//       ],
//     },
//   });
// };

// PRIVATE FUNCTION

//PUBLIC FUNCTION
const sendMessageToChannel = (client, msg, channel = data.LOGGER_CHANNEL) => {
  client.channels.cache.get(channel).send(msg);
};

module.exports = {
  sendMessageToChannel,
};

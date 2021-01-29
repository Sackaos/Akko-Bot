const discordUtility = require("./../discordUtility");
const fs = require("fs");
const path = require("path");

const loadEmojiJson = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../data", "config.json"))
  ).emoji;
};

const emojiCreateHandler = (emoji, client) => {
  const emojiJSON = loadEmojiJson();
  let msgToSend = emojiJSON.emojiCreate.response;

  if (emojiJSON.emojiCreate.showEmoji)
    msgToSend += `<:${emoji.name}:${emoji.id}>`;

  discordUtility.sendMessageToChannel(
    client,
    msgToSend,
    discordUtility.LOGGER_CHANNEL
  );
};

const emojiDeleteHandler = (emoji, client) => {
  const emojiJSON = loadEmojiJson();
  let msgToSend = emojiJSON.emojiDelete.response;
  msgToSend = msgToSend.replace("|emojiname|", emoji.name);

  discordUtility.sendMessageToChannel(
    client,
    msgToSend,
    discordUtility.LOGGER_CHANNEL
  );
};

const emojiUpdateHandler = (oldEmoji, newEmoji, client) => {
  const emojiJSON = loadEmojiJson();
  let msgToSend = emojiJSON.emojiUpdate.response;
  msgToSend = msgToSend.replace("|oldemojiname|", oldEmoji.name);
  msgToSend = msgToSend.replace("|newemojiname|", newEmoji.name);

  discordUtility.sendMessageToChannel(
    client,
    msgToSend,
    discordUtility.LOGGER_CHANNEL
  );
};

module.exports = { emojiCreateHandler, emojiDeleteHandler, emojiUpdateHandler };

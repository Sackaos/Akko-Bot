const discordUtility = require("./../discordUtility");
const fs = require("fs");
const path = require("path");

const loadEmojiJson = () => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, "emoji.json")));
};

const emojiCreateHandler = (emoji, client) => {
  const emojiData = loadEmojiJson();
  let msgToSend = emojiData.emojiCreate.response;

  if (emojiData.emojiCreate.showEmoji)
    msgToSend += `<:${emoji.name}:${emoji.id}>`;

  discordUtility.sendMsgToChannel(client, msgToSend);
};

const emojiDeleteHandler = (emoji, client) => {
  const emojiData = loadEmojiJson();
  let msgToSend = emojiData.emojiDelete.response;
  msgToSend = msgToSend.replace("|emojiname|", emoji.name);

  discordUtility.sendMsgToChannel(client, msgToSend);
};

const emojiUpdateHandler = (oldEmoji, newEmoji, client) => {
  const emojiData = loadEmojiJson();
  let msgToSend = emojiData.emojiUpdate.response;
  msgToSend = msgToSend.replace("|oldemojiname|", oldEmoji.name);
  msgToSend = msgToSend.replace("|newemojiname|", newEmoji.name);

  discordUtility.sendMsgToChannel(client, msgToSend);
};

module.exports = { emojiCreateHandler, emojiDeleteHandler, emojiUpdateHandler };

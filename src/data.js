const paths = require("./paths.js");
const fs = require("fs");

// === PRIVATE FUNCTION ===
/** retrive a single data point or a object file from JSON
 * let say you want the logger channel ID of "keys.json"
 * 1. you send the fullpath to the .json
 * 2. you send an array: ["channelsID", "logger"]
 *
 * @param {fullpath to json file} path
 * @param {liss of string} valueTree
 */
const retrieveJSONData = (path, valueTree) => {
  const json = JSON.parse(fs.readFileSync(path));
  let data = json;
  for (let i = 0; i < valueTree.length; i++) {
    data = data[valueTree[i]];
  }
  return data;
};

// === PUBLIC METHODS ===
const saveMessageToDatabase = (msg) => {
  fs.readFile(paths.MEMORY_PATH, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //now it an object
      obj = JSON.parse(data);
      //add some data
      const { reference, author, content } = msg;
      const {
        id,
        username,
        bot,
        avatar,
        createdTimestamp,
        tag,
        displayAvatarURL,
      } = author;
      obj.history.push({
        reference,
        author: {
          id,
          username,
          bot,
          avatar,
          createdTimestamp,
          tag,
          displayAvatarURL,
        },
        content,
      });
      json = JSON.stringify(obj); //convert it back to json

      fs.writeFile(paths.MEMORY_PATH, json, "utf8", (err) => {}); // write it back
    }
  });
};

const loadMessageHistory = () => {
  if (!fs.existsSync(paths.MEMORY_PATH)) {
    json = JSON.stringify({ history: [] });
    fs.writeFileSync(paths.MEMORY_PATH, json);
  }
  return JSON.parse(
    fs.readFileSync(paths.MEMORY_PATH, "utf8", (err, data) => {})
  ).history;
};

const deleteHistoryData = () => {
  fs.readFile(paths.MEMORY_PATH, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      //now it an object
      obj = JSON.parse(data);
      //add some data
      obj.history = [];
      json = JSON.stringify(obj); //convert it back to json

      fs.writeFile(paths.MEMORY_PATH, json, "utf8", (err) => {}); // write it back
    }
  });
};

const loadMessagesData = () => {
  return retrieveJSONData(paths.CONFIG_PATH, ["messages"]);
};

const loadCommandsData = () => {
  return retrieveJSONData(paths.CONFIG_PATH, ["commands"]);
};

const loadRolesData = () => {
  return retrieveJSONData(paths.KEYS_PATH, ["roles"]);
};

// === PUBLIC CONST ===
const BOT_NAME = retrieveJSONData(paths.CONFIG_PATH, ["bot", "name"]);
const BOT_TOKEN = retrieveJSONData(paths.KEYS_PATH, ["botToken"]);
const BOT_PREFIXES = retrieveJSONData(paths.CONFIG_PATH, [
  "bot",
  "commandPrefixs",
]);

// CHANNELS
const LOGGER_CHANNEL = retrieveJSONData(paths.KEYS_PATH, [
  "channelsID",
  "logger",
]);
const MAIN_CHANNEL = retrieveJSONData(paths.KEYS_PATH, ["channelsID", "main"]);
const DEBUG_CHANNEL = retrieveJSONData(paths.KEYS_PATH, [
  "channelsID",
  "debug",
]);

// SERVER
const SERVER_ID = retrieveJSONData(paths.KEYS_PATH, ["serverID"]);

module.exports = {
  DEBUG_CHANNEL,
  MAIN_CHANNEL,
  LOGGER_CHANNEL,
  SERVER_ID,
  BOT_TOKEN,
  BOT_PREFIXES,
  BOT_NAME,
  saveMessageToDatabase,
  deleteHistoryData,
  loadMessageHistory,
  loadMessagesData,
  loadCommandsData,
  loadRolesData,
};

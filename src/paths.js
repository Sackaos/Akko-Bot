const path = require("path");

const MEMORY_PATH = path.join(__dirname, "../../", "memory.json");
const CONFIG_PATH = path.join(__dirname, "../data/", "config.json");
const KEYS_PATH = path.join(__dirname, "../data/", "keys.json");
const DERPYFACES_DIR_PATH = path.join(
  __dirname,
  "../../image-folder/derpy-faces"
);

module.exports = { MEMORY_PATH, CONFIG_PATH, KEYS_PATH, DERPYFACES_DIR_PATH };

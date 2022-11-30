const TouchGuild = require("touchguild");
const config = require("./config.json");

const client = new TouchGuild.Client({token: config.token});

client.connect();

const TG = require("touchguild");
const config = require("../config.json");
const Watch2GetherService = require("../services/w2g");
const CommandHelp = require("../utils/CommandHelp");

/**
 * @param message {TG.Message}
 * @param client {TG.Client}
 * @returns {Promise<void>}
 */
async function execute(message, client) {
	const url = await Watch2GetherService.createRoom();
	const embed = Watch2GetherService.generateEmbed(await message.member, url);

	await client.createMessage(config.channels.watch2gether, {embeds: [embed]});
}

module.exports = {
	cmd: "w2g",
	execute,
	help: new CommandHelp(
		"Tworzy pokój Watch2Gether.",
		"Ta komenda stworzy pokój w serwisie Watch2Gether, a następnie wyśle zaproszenie na kanał 📼│watch2gether."
	)
};

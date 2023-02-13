const TG = require("touchguild");
const QuickStreamService = require("../services/quickstream");
const CommandHelp = require("../utils/CommandHelp");

/**
 * @param message {TG.Message}
 * @param client {TG.Client}
 * @returns {Promise<void>}
 */
async function execute(message, client) {
	const url = await QuickStreamService.createSession();
	const embed = QuickStreamService.generateEmbed(await message.member, url);

	await message.createMessage({replyMessageIds: [message.id], embeds: [embed], isPrivate: true});
}

module.exports = {
	cmd: "qs",
	execute,
	help: new CommandHelp(
		"Tworzy sesję QuickStream.",
		"Ta komenda stworzy sesję w serwisie QuickStream i wyśle link do panelu kontrolowania strumienia jako prywatna odpowiedź."
	)
};

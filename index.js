const TG = require("touchguild");
const config = require("./config.json");
const path = require("path");
const fs = require("fs");
const CommandHelp = require("./utils/CommandHelp");
const helpgen = require("./helpgen");

const PREFIX = config.prefix;
const client = new TG.Client({token: config.token});

/**
 * @typedef {Object} CommandDefinition
 * @property {string} cmd
 * @property {(message: TG.Message, client: TG.Client, argument: any) => Promise<void>} execute
 * @property {function(string): any} [argumentConverter]
 * @property {CommandHelp} [help]
 */

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

/** @type {Object<string, CommandDefinition>} */
const commands = {
	pomoc: {
		cmd: "pomoc",
		execute: async (message, _, commandToShowHelpFor) => {
			/** @type {Object} */
			let embed;

			if (commandToShowHelpFor) {
				if (!commands.hasOwnProperty(commandToShowHelpFor)) {
					await message.createMessage({
						content: `Nie ma takiej komendy jak \`/${commandToShowHelpFor}\`. Aby zobaczyć pełną listę komend, użyj \`/pomoc\`.`,
						isPrivate: true,
						replyMessageIds: [message.id]
					});
					return;
				}

				embed = helpgen.generateHelpEmbedForCommand(commands[commandToShowHelpFor]);
			} else {
				embed = helpgen.generateHelpEmbed(Object.values(commands));
			}

			await message.createMessage({
				embeds: [embed],
				isPrivate: true,
				replyMessageIds: [message.id]
			});
		},
		help: new CommandHelp(
			"Wyświetla tą wiadomość.",
			"Za pomocą tej komendy, możesz wyświetlić listę wszystkich komend lub zobaczyć szczegółową pomoc dotyczącą jednej z nich.",
			{
				argumentName: "komenda",
				helpText: "Nazwa komendy (bez poprzedzającego ukośnika), dla której chcesz wyświetlić szczegółową pomoc."
			})
	}
};

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ("cmd" in command && "execute" in command) {
		commands[command.cmd] = command;
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "cmd" or "execute" property.`);
	}
}

client.on("ready", () => {
	console.log(`Zalogowany jako ${client.user.username}`);
});

client.on("error", err => {
	console.error(err);
});

client.on("messageCreate", async message => {
	const executor = await message.member;

	if (executor.bot || !message.content.startsWith(PREFIX) || message.content.length === PREFIX.length) return;

	let commandName = message.content.replace(PREFIX, "");
	/** @type {?string} */
	let argument = null;

	if (!commandName) return;

	const split = commandName.split(" ", 2);
	if (split.length > 1) {
		commandName = split[0];
		argument = split[1].trim();
	}

	const commandData = commands[commandName];

	if (!commandData) {
		await message.createMessage({
			content: `Nie ma takiej komendy jak \`/${commandName}\`. Aby zobaczyć pełną listę komend, użyj \`/pomoc\`.`,
			isPrivate: true,
			replyMessageIds: [message.id]
		});
		return;
	}
	if (commandData.argumentConverter && argument) argument = commandData.argumentConverter(argument);

	console.log(`====> ${executor.nickname} wykonuje /${commandName} <====`);

	commandData.execute(message, client, argument)
		.catch(async err => {
			const member = await message.member;
			console.error(`Error occurred while executing a command. Message info:\nAuthor: ${member.username}\nContent: ${message.content}\n\n${err}`);
			console.trace(err);
		});
});

client.connect();

/**
 * @param commandDefinitions {CommandDefinition[]}
 * @returns {Object}
 */
function generateHelpEmbed(commandDefinitions) {
	const fields = [];

	for (const definition of commandDefinitions) {
		let fieldName = "`/" + definition.cmd;

		if (definition.help?.argumentHelp) {
			/** @type {CommandArgumentHelp} */
			const argumentHelp = definition.help.argumentHelp;

			fieldName += ` [${argumentHelp.argumentName ?? "argument"}]`;
		}

		fieldName += "`";

		fields.push({
			name: fieldName,
			value: definition.help?.shortHelp ?? ""
		});
	}

	return {
		title: "Potrzebujesz pomocy?",
		description: "Oto wszystkie komendy, które bot potrafi wykonać:",
		color: 0x541EEA,
		fields
	};
}

/**
 * @param commandDefinition {CommandDefinition}
 * @returns {Object}
 */
function generateHelpEmbedForCommand(commandDefinition) {
	let title = "`/" + commandDefinition.cmd;

	if (commandDefinition.help?.argumentHelp) {
		/** @type {CommandArgumentHelp} */
		const argumentHelp = commandDefinition.help.argumentHelp;

		title += ` [${argumentHelp.argumentName ?? "argument"}]`;
	}

	title += "`";

	const embed = {
		title,
		description: commandDefinition.help?.longHelp ?? "Nie ma dostępnej szczegółowej pomocy dla tej komendy.",
		color: 0x541EEA
	};

	if (commandDefinition.help?.argumentHelp) {
		embed.fields = [{
			name: `Argument \`${commandDefinition.help.argumentHelp.argumentName}\``,
			value: commandDefinition.help.argumentHelp.helpText
		}];
	}

	return embed;
}

module.exports = {generateHelpEmbed, generateHelpEmbedForCommand};

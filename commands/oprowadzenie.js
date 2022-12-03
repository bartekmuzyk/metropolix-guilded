const TG = require("touchguild");
const CommandHelp = require("../utils/CommandHelp");

/**
 * @param message {TG.Message}
 * @param client {TG.Client}
 * @returns {Promise<void>}
 */
async function execute(message, client) {
	await message.createMessage({
		embeds: [{
			title: "Witaj na Metropolii!",
			description: "Oto informacje na temat kilku kanałów, które mogą okazać się przydatne:",
			color: 0x541EEA,
			thumbnail: {
				url: "https://media1.tenor.com/images/ab575ad9c34ba3384d8c7cf64428d561/tenor.gif?itemid=18592357"
			},
			fields: [{
				name: "🌍│ogólny",
				value: "Tu możesz porozmawiać o czymkolwiek. Staramy się jednak nie rozwijać konfliktów na tle światopoglądowym, dlatego prosimy unikać prowokacji lub dłuższych wypowiedzi na kontrowersyjne tematy."
			}, {
				name: "🌟│show and tell",
				value: "Na tym kanale możesz wysłać cokolwiek co zostało przez Ciebie znalezione w internecie. Mile widziane jest poprawne oznaczanie zawartości NSFW (np. dopiskiem do wiadomości, lub spoilerem)."
			}, {
				name: "🎨│autorskie",
				value: "Nie myl tego kanału z show-and-tell! Tu możesz wstawić jedynie to co zostało przez Ciebie stworzone (nawet jeżeli to coś bazuje na twórczości kogoś innego). Również mile widziane jest oznaczanie zawartości NSFW, tak jak powyżej."
			}, {
				name: "🗿│siedziba wielkiego janusza",
				value: "TU MIEJSCE JEST CHAOSU WSZELAKIEGO, NIECHAJ ANARCHIA NASTANIE!"
			}, {
				name: "📷│ojom",
				value: "Miejsce na nadzwyczajne screeny z kamerek na kanałach streamowych, zarazem źródło wszelkich przeróbek z udziałem innych członków serwera. Domyślnie nie potrzebujesz zgody od innych na przerobienie dowolnego zdjęcia na którym się znajdują, dopóki znajduje się ono na tym kanale."
			}, {
				name: "📩│kandydatura",
				value: "Kanał głównie przeznaczony na głosowania na administratora bądź moderatora serwera."
			}, {
				name: "👾│games",
				value: "Kanał przeznaczony do gier - ogólnie. Do tematycznych rozmów, użyj kanału odpowiadającego danej grze."
			}],
			footer: {
				text: "Życzymy miłej zabawy!"
			}
		}],
		isPrivate: true,
		replyMessageIds: [message.id]
	});
}

module.exports = {
	cmd: "oprowadzenie",
	execute,
	help: new CommandHelp("Pokazuje krótkie oprowadzenie po serwerze.")
};
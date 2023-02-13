const TG = require("touchguild");
const fetch = require("node-fetch");

const INSTANCE_URL = "https://quickstream.fly.dev";

class QuickStreamService {
	/**
	 * @returns {Promise<string>} Secret session panel URL
	 */
	static async createSession() {
		/** @type {Response} */
		const createResponse = await fetch(`${INSTANCE_URL}/sesja`, {
			method: "POST"
		});

		if (!createResponse.ok) throw new Error();

		const sessionCreationData = await createResponse.json();
		const params = (new URLSearchParams(sessionCreationData)).toString();

		return `${INSTANCE_URL}/panel?${params}`;
	}

	/**
	 * @param creator {TG.Member}
	 * @param url {string}
	 * @returns {Object}
	 */
	static generateEmbed(creator, url) {
		return {
			title: "Twój panel kontrolowania strumienia",
			description: "Kliknij w link, aby otworzyć panel i rozpocząć strumień.",
			url,
			color: 0xF1FB24,
			author: {
				name: creator.username,
				icon_url: creator.user.avatarURL
			}
		};
	}
}

module.exports = QuickStreamService;

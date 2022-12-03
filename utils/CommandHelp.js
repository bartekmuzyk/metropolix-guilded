/**
 * @typedef {Object} CommandArgumentHelp
 * @property {string} argumentName
 * @property {string} helpText
 */

class CommandHelp {
	/** @type {?string} */
	shortHelp;

	/** @type {?string} */
	longHelp;

	/** @type {?CommandArgumentHelp} */
	argumentHelp;

	/**
	 * @param shortHelp {?string}
	 * @param longHelp {?string}
	 * @param argumentHelp {?CommandArgumentHelp}
	 */
	constructor(shortHelp = null, longHelp = null, argumentHelp = null) {
		this.shortHelp = shortHelp;
		this.longHelp = longHelp;
		this.argumentHelp = argumentHelp;
	}
}

module.exports = CommandHelp;

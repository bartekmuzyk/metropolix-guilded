class ArgumentConverters {
	static int = v => parseInt(v);
	static float = v => parseFloat(v);
	static lowercase = v => v.toLowerCase();
}

module.exports = ArgumentConverters;

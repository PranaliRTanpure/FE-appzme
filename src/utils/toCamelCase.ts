export const toCamelCase = (value: string): string => {
	if (!value) {
		return "";
	}

	const val = value
		.replace("_", " ")
		.trim()
		.replace("_", " ")
		.replace("_", " ");

	return val.substring(0, 1).toUpperCase() + val.substring(1).toLowerCase();
};

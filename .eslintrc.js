module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "next/core-web-vitals"],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		// Basic rules
		"no-unused-vars": "warn",
		"no-console": "warn",
	},
};

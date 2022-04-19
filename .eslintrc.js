module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'windows'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		"@typescript-eslint/ban-ts-comment": "off",
		"prefer-const": "off",
		// suppress errors for missing 'import React' in files
		"react/react-in-jsx-scope": "off",
		// allow jsx syntax in js files (for next.js project)
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], 
	},
	// "workingDirectories": {
	// 	mode: 'auto'
	// }
}

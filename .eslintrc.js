module.exports = {
	"root": true,
	"parser": "@typescript-eslint/parser",
	"plugins": [
	  "@typescript-eslint"
	],
	"ignorePatterns": ['.eslintrc.js', 'build'],
	"extends": [
	  "eslint:recommended",
	  "plugin:@typescript-eslint/eslint-recommended",
	  "plugin:@typescript-eslint/recommended"
	],
	"rules": {
		"max-len": ["error", { ignoreComments: true, code: 80 }],
	}
  }
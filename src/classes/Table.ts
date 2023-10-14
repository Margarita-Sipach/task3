import { RulesObject } from "./Rule";
import { printTable } from "console-table-printer";

const SWITCH_CELL = 'v You\\PC >'

export class Table {
	private _rulesObject: RulesObject;
	private _content: Array<{[key: string]: string}>;

	constructor(rulesObject: RulesObject) {
		this._rulesObject = rulesObject
		this._content = this.generateContent()
	}

	private generateContent() {
		const header = [SWITCH_CELL, ...Object.keys(this._rulesObject)];
		const body = Object.entries(this._rulesObject).map(([key, val]) => {
			return {
				[SWITCH_CELL]: key,
				...val
			}
		})
		return body
	}

	show() {
		printTable(this._content);
	}
}
import crypto from "crypto";
import _ from "lodash"
import chalk from 'chalk';

enum titles {
	hmac = 'HMAC: ',
	key = 'HMAC key: ',
	move = 'Computer move: '
}

const BITES = 256;
const STRING_TYPE = 'hex';
const ALGORITHM = 'sha256'

export class ComputerHandler {

	private _key: string;
	private _move: string;
	private _hmac: string;

	constructor(moves: string[]) {
		const bytes = this.convertBitesInBytes(BITES);
		this._key = crypto.randomBytes(bytes).toString(STRING_TYPE);
		this._move = _.sample(moves) || moves[0]
		this._hmac = this.generateHmac()
	}

	get key() {
		return this._key
	}

	get move() {
		return this._move
	}

	get hmac() {
		return this._hmac
	}

	showHmac() {
		console.log(chalk.blue(`${titles.hmac}${this._hmac}`))
	}

	showKey() {
		console.log(chalk.blue(`${titles.key}${this._key}`))
	}

	showMove() {
		console.log(chalk.green(`${titles.move}${this._move}`))
	}

	private generateHmac() {
		return crypto.createHmac(ALGORITHM, this._key)
			.update(this._move)
			.digest(STRING_TYPE);
	}

	private convertBitesInBytes(bites: number){
		const amountBitesInByte = 8
		return bites / amountBitesInByte
	}
}
import crypto from "crypto";
import _ from "lodash"

enum titles {
	hmac = 'HMAC: ',
	key = 'HMAC key: '
}

const BYTES = 256;
const STRING_TYPE = 'hex';
const ALGORITHM = 'sha256'

export class ComputerHandler {

	private _key: string;
	private _move: string;
	private _hmac: string;

	constructor(moves: string[]) {
		this._key = crypto.randomBytes(BYTES).toString(STRING_TYPE);
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
		console.log(`${titles.hmac}${this._hmac}`)
	}

	showKey() {
		console.log(`${titles.key}${this._key}`)
	}

	private generateHmac() {
		return crypto.createHmac(ALGORITHM, this._key)
			.update(this._move)
			.digest(STRING_TYPE);
	}
}
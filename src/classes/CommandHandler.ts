import { PermanentCommands } from "../const/permanentCommands"
import { select } from '@inquirer/prompts';
import chalk from 'chalk';

const MIN_MOVES_AMOUNT = 3

const ValidateMessages = {
	wrongAmount: 'Moves amount must be >= 3',
	wrongOdd: 'Moves amount must be odd',
	wrongUniq: 'Moves must be uniq',
	example: 'Example: rock Spock paper lizard scissors'
}

const selectTitle = 'Select command:'

export class CommandHandler {

	private _moves: string[];
	private _commands: string[];

	constructor(moves: string[]) {
		this._moves = moves
		this._commands = [...moves, ...Object.values(PermanentCommands)]
	}

	get moves() {
		return this._moves
	}

	get commands() {
		return this._commands
	}

	get movesAmount() {
		return this._moves.length
	}

	get halfOfMovesAmount(){
		return this.movesAmount / 2
	}

	validateMoves() {
		const messages = this.getValidateMessagess();
		messages.forEach(msg => console.log(chalk.red(msg)))
		return !messages.length
	}

	async selectCommands() {
		return await select({
			message: selectTitle,
			choices: this._commands.map((item) => ({ value: item }))
		})
	}

	isMove(command: string){
		return this._moves.includes(command)
	}

	private getValidateMessagess() {
		const validateMessages = [
			!this.checkAmount() && ValidateMessages.wrongAmount,
			!this.checkOdd() && ValidateMessages.wrongOdd,
			!this.checkUniq() && ValidateMessages.wrongUniq
		].filter(Boolean)

		if(validateMessages.length) console.log(ValidateMessages.example)

		return validateMessages
	}

	private checkAmount() {
		return this.movesAmount > MIN_MOVES_AMOUNT
	}

	private checkOdd() {
		return this.movesAmount % 2
	}

	private checkUniq() {
		const uniqMovesAmount = new Set(this._moves).size;
		return uniqMovesAmount === this.movesAmount
	}
}
import { CommandHandler } from "./CommandHandler";
import { GameResults } from "../const/gameResults";
import chalk from "chalk"

export interface RulesObject {
	[userMove: string]: {
		[computerMove: string]: GameResults;
	};
}

export class Rule {
	private _commands: CommandHandler;
	private _rulesObject: RulesObject;

	constructor(commands: CommandHandler) {
		this._commands = commands;
		this._rulesObject = this.generateRulesObject();
	}

	private generateRulesObject() {
		const moves = this._commands.moves

		return moves.reduce((acc, userMove, i) => {
			const userMoveObj = this.generateUserMoveObj(moves, userMove, i)
			return this.generateReduceAcc(acc, userMove, userMoveObj) 
		}, {})
	}

	private generateUserMoveObj(moves: string[], userMove: string, i: number) {
		const movesRighterUsers = this.getMovesRighterSelected(moves, i);

		return moves.reduce((res, computerMove) => {
			const roundResult = this.generateRoundResult(movesRighterUsers, userMove, computerMove)
			return this.generateReduceAcc(res, computerMove, roundResult) 
		}, {})
	}

	private generateReduceAcc(acc: object, key: string, val: string | object){
		return ({
			...acc,
			[key]: val
		})
	}

	private getMovesRighterSelected(
		moves: string[], 
		selectedMoveIndex: number
	) {
		return [
			...moves.slice(selectedMoveIndex),
			...moves.slice(0, selectedMoveIndex)
		]
	}

	private generateRoundResult(
		movesRighterUsers: string[], 
		userMove: string, 
		computerMove: string
	) {
		const halfI = this._commands.halfOfMovesAmount + 1;
		const roundResultHelper = (sliceArgs: number[]) => {
			return movesRighterUsers.slice(...sliceArgs).includes(computerMove)
		}

		const isComputerWin = roundResultHelper([1, halfI])
		const isUserWin = roundResultHelper([halfI])
		const isDraw = userMove === computerMove;

		return isUserWin && GameResults.user
            || isComputerWin && GameResults.computer
            || isDraw && GameResults.draw
            || ''
	}

	get rulesObject() {
		return this._rulesObject
	}

	getRoundResult(userMove: string, computerMove: string){
		return this._rulesObject[userMove][computerMove]
	}

	showRoundResult(userMove: string, computerMove: string) {
		const roundResult = this.getRoundResult(userMove, computerMove)
		console.log(chalk.bgBlue(roundResult))
	}
}
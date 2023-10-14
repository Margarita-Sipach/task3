import { PermanentCommands } from "../const/permanentCommands";
import { CommandHandler } from "./CommandHandler"
import { ComputerHandler } from "./ComputerHandler"
import { Table } from "./Table"
import { Rule } from "./Rule"
import chalk from 'chalk';

enum Titles{
	userMove = 'Your move: '
}

export class Game {

	private static instance: Game;

	private _commandHandler: CommandHandler;
	private _computerHandler: ComputerHandler;
	private _table: Table;
	private _rule: Rule;

	constructor(moves: string[]) {

		if (Game.instance) {
			return Game.instance
		}
		Game.instance = this

		this._commandHandler = new CommandHandler(moves)
		this._computerHandler = new ComputerHandler(moves)
		this._rule = new Rule(this._commandHandler)
		this._table = new Table(this._rule.rulesObject)
	}

	public async start() {
		const areMovesValid = this._commandHandler.validateMoves()
		if (!areMovesValid) return;

		this._computerHandler.showHmac();
		const selectedCommand = await this._commandHandler.selectCommands();

		if (selectedCommand === PermanentCommands.exit) return
		if (selectedCommand === PermanentCommands.help) return this._table.show()
		if (this._commandHandler.moves.includes(selectedCommand)) return this.startRound(selectedCommand)
		
		return console.log('error')
	}

	startRound(userMove: string){
		this.showUserMove(userMove)
		this._computerHandler.showMove();
		this._rule.showRoundResult(userMove, this._computerHandler.move)
		this._computerHandler.showKey()
	}

	showUserMove(userMove: string){
		console.log(chalk.green(`${Titles.userMove}${userMove}`));
	}
}
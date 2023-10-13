import { PermanentCommands } from "../const/permanentCommands";
import { CommandHandler } from "./CommandHandler"
import { ComputerHandler } from "./ComputerHandler"

export class Game {

	private static instance: Game;

	private _commandHandler: CommandHandler;
	private _computerHandler: ComputerHandler;

	constructor(moves: string[]) {

		if (Game.instance) {
			return Game.instance
		}
		Game.instance = this

		this._commandHandler = new CommandHandler(moves)
		this._computerHandler = new ComputerHandler(moves)
	}

	public async start() {
		const areMovesValid = this._commandHandler.validateMoves()
		if (!areMovesValid) return;

		this._computerHandler.showHmac();
		const selectedCommand = await this._commandHandler.selectCommands();

		if (selectedCommand === PermanentCommands.exit) return
		if (selectedCommand === PermanentCommands.help) return console.log('help')
		if (this._commandHandler.moves.includes(selectedCommand)) return console.log('new round')
		return console.log('error')
	}
}
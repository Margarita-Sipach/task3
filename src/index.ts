import {Game} from "./classes/Game"
const NO_DATA_ERROR = 'No data!!!'
import chalk from 'chalk';

const moves = process.argv.slice(2);

if(!moves.length) {
	console.log(chalk.red(NO_DATA_ERROR)) 
}
else{
	const game = new Game(moves)
	game.start()
}


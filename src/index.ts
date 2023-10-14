import {Game} from "./classes/Game"

const moves = process.argv.slice(2);

const game = new Game(moves)
game.start()
import {Game} from "./classes/Game"

const moves = ['rock', 'Spock', 'paper', 'lizard', 'scissors'] //process.argv.slice(2); //

const game = new Game(moves)
game.start()
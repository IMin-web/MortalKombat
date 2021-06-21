import { generateLogs } from "./generateLog.js"
import { getRandom } from "./random.js";
import { Player } from "./Player/index.js";
import { $arena } from "./arena.js"

let player1;
let player2;

export class Game {
    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }
    start = async () => {
        const players = await this.getPlayers();
            const p1 = JSON.parse(localStorage.getItem('player1'));
            const p2 = players[getRandom(players.length) - 1];
            player1 = new Player({
                ...p1,
                player: 1,
                rootSelector: 'arenas',
            });
            player2 = new Player({
                ...p2,
                player: 2,
                rootSelector: 'arenas',
            });
            $arena.appendChild(player1.createPlayer());
            $arena.appendChild(player2.createPlayer());
            generateLogs('start', player1, player2);
            return {player1, player2}
    }
}
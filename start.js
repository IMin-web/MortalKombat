import { player1, player2 } from "./player.js";
import { generateLogs } from "./generateLog.js"
import { createPlayer } from "./create.js";
import { $arena, $formFight } from "./arena.js";
import { onSubmit } from "./submit.js"


export class Game {
    start = () => {
        $arena.appendChild(createPlayer(player1));
        $arena.appendChild(createPlayer(player2));
        generateLogs('start', player1, player2);
        $formFight.addEventListener('submit', function (e) {
            e.preventDefault();
            onSubmit();
        })
    }
}
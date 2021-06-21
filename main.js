import { Game } from "./start.js";
import { $formFight, $arena } from "./arena.js";
import { HIT } from "./fight.js";
import { getRandom } from "./random.js";
import { generateLogs } from "./generateLog.js";
import { createReloadButton } from "./winning.js"
import { playerWin } from "./winning.js";

const game = new Game();
let players;
let player1;
let player2;
game.start()
    .then(res => { players = res })
    .then(() => player1 = players.player1)
    .then(() => player2 = players.player2)


$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    let attack = {};
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    };

    const players = async () => {
        const players = await responseFetch(attack);
        const mine = players.player1;
        const enemy = players.player2;
        if (mine.hit !== enemy.defence) {
            player2.changeHP(attack.value)
            player2.renderHP(attack.value)
            generateLogs('hit', player1, player2);
        }
        if (enemy.hit == attack.defence) {
            generateLogs('defence', player1, player2);
        }

        if (enemy.hit !== attack.defence) {
            player1.changeHP(enemy.value)
            player1.renderHP(enemy.value)
            generateLogs('hit', player2, player1);
        }
        if (attack.hit == enemy.defence) {
            generateLogs('defence', player2, player1);
        }
        if (player1.hp === 0 || player2.hp === 0) {
            createReloadButton();
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arena.appendChild(playerWin(player2));
            generateLogs('end', player2, player1)
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arena.appendChild(playerWin(player1));
            generateLogs('end', player1, player2)
        } else if (player1.hp === 0 && player1.hp === 0) {
            $arena.appendChild(playerWin());
            generateLogs('draw')
        }
    }
    players();
});

const responseFetch = async (attack) => {
    let { hit, defence } = attack;
    let body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
        })
    })
        .then(res => res.json());
    return body;
}
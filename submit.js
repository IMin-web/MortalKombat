import { playerWin } from "./winning.js";
import { HIT } from "./fight.js";
import { getRandom } from "./random.js";
import { $arena, $formFight } from "./arena.js";
import { createReloadButton } from "./winning.js";
import { enemyAttack } from "./fight.js";
import { player1, player2 } from "./player.js";
import { generateLogs } from "./generateLog.js";

const enemy = enemyAttack();
const attack = {};

export const onSubmit = () => {
    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    if (attack.hit !== enemy.defence) {
        player2.changeHP(attack.value)
        generateLogs('hit', player1, player2);
    }
    if (enemy.hit == attack.defence) {
        generateLogs('defence', player1, player2);
    }

    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value)
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
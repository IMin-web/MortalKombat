import { player1, player2 } from "./player.js";
import { getRandom } from "./random.js";
import { generateLogs } from "./generateLog.js"
import { createReloadButton } from "./winning.js";
import { enemyAttack } from "./fight.js";
import { playerWin } from "./winning.js";
import { HIT } from "./fight.js";
 
export const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');


export let createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

let createPlayer = (playerObj) => {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $img = createElement('img');

    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $life.style.width = playerObj.hp + '%'; //Значение здоровья у персонажей
    $progressbar.appendChild($name);
    $name.innerText = (playerObj.name); //Имена персонажей
    $player.appendChild($character);
    $character.appendChild($img);
    $img.src = playerObj.img;
    return $player
 }

 $formFight.addEventListener('submit', function(e) {
     e.preventDefault();
     const enemy = enemyAttack();
     const attack = {};
    
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
    if (attack.hit !== enemy.defence){
        player2.changeHP(attack.value)
        generateLogs('hit', player1, player2);
    }
    if (enemy.hit == attack.defence) {
        generateLogs('defence', player1, player2);
    }

    if (enemy.hit !== attack.defence){
        player1.changeHP(enemy.value)
        generateLogs('hit', player2, player1);
    }
    if (attack.hit == enemy.defence) {
        generateLogs('defence', player2, player1);
    }

     if (player1.hp === 0 || player2.hp === 0){
        createReloadButton();
     }

     if (player1.hp === 0  && player1.hp < player2.hp){
         $arena.appendChild(playerWin(player2.name));
         generateLogs('end' , player2.name, player1.name)
     } else if (player2.hp === 0  && player2.hp < player1.hp){
        $arena.appendChild(playerWin(player1.name));
        generateLogs('end' , player1, player2)
    } else if (player1.hp === 0  && player1.hp === 0){
        $arena.appendChild(playerWin());
        generateLogs('draw')
    }
 })

 $arena.appendChild(createPlayer(player1));
 $arena.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);
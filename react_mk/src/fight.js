import './style.css'
import {logs} from "./log";
import {hit, defence, end, draw } from './fight_sounds'
// import { Game } from "./game.js";
import { getRandom } from "./random.js";
// import { generateLogs } from "./generateLog.js";
// import { createReloadButton } from "./winning.js"
// import { playerWin } from "./winning.js";
import {select, choos1 } from './fight_sounds'
import { Player } from "./Player/index.js";
import { useEffect, useRef} from 'react';
import { createElement } from "./create.js"
import Orient from './Orient'
// import { $arena } from "./arena.js"



export default function Fight(){
    const $arena = useRef();
const $formFight = useRef();


let removeArena = (tag) => $arena.current.removeChild(document.querySelector(tag));

let playerWin = (player) => {
    const $WinTitle = createElement('div', 'WinTitle');
    if (player) {
        $WinTitle.innerText = player.name + ' WIN';
    } else {
        $WinTitle.innerText = 'DRAW';
    }

    return $WinTitle;
}
const $chat = useRef();

const generateLogs = (type, player1, player2) => {

    let text = null;
    let el = null;
    const generateText = () => {
        el = `<p>${text}</p>`;
        $chat.current.insertAdjacentHTML('afterbegin', el);
    }
    switch (type) {
        case 'start':
            text = logs['start'].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', timeNow());
            generateText();
            break
        case 'hit':
            text = timeNow() + ' ' + logs[type][getRandom(18) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + `[- ${player2.lastHp()}]` + `[${player2.hp} / 100]`;
            generateText();
            hit.play();
            break
        case 'defence':
            text = timeNow() + ' ' + logs[type][getRandom(8) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name) + `[${player1.lastHp()}]` + `[${player1.hp} / 100]`;
            generateText();
            defence.play();
            break
        case 'end':
            text = timeNow() + ' ' + logs['end'][getRandom(3) - 1].replace('[playerLose]', player2.name).replace('[playerWins]', player1.name);
            generateText();
            end.play();
            break
        case 'draw':
            text = logs['draw'];
            generateText();
            draw.play()
            break
            default:
                break;
    }
}
const timeNow = () => {
    let date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
}


let createReloadButton = () => {
    removeArena('.control');
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $buttonReload = createElement('button', 'button')
    $buttonReload.innerText = 'Restart';
    $arena.current.appendChild($reloadWrap);
    $reloadWrap.appendChild($buttonReload);
    $buttonReload.addEventListener('click', function () {
        window.location.reload();
    })
}
let player1;
let player2;

useEffect(() => {
class Game {
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
            $arena.current.appendChild(player1.createPlayer());
            $arena.current.appendChild(player2.createPlayer());
            generateLogs('start', player1, player2);
            return {player1, player2}
    }
}

    const game = new Game();
    game.start()
        .then(res => { return player1 = res.player1, player2 = res.player2 });
    })


const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ul = document.querySelectorAll('label')
for (let index = 0; index < ul.length; index++) {
    ul[index].addEventListener('mouseover', () => {
        select.play()
})
ul[index].addEventListener('mouseout', () => {
    select.play()
})
}

function submit(e) {
    e.preventDefault();
    let attack = {};
    for (let item of $formFight.current) {
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
        if (enemy.hit === attack.defence) {
            generateLogs('defence', player1, player2);
        }

        if (enemy.hit !== attack.defence) {
            player1.changeHP(enemy.value)
            player1.renderHP(enemy.value)
            generateLogs('hit', player2, player1);
        }
        if (attack.hit === enemy.defence) {
            generateLogs('defence', player2, player1);
        }
        if (player1.hp === 0 || player2.hp === 0) {
            createReloadButton();
        }
        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arena.current.appendChild(playerWin(player2));
            generateLogs('end', player2, player1)
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arena.current.appendChild(playerWin(player1));
            generateLogs('end', player1, player2)
        } else if (player1.hp === 0 && player1.hp === 0) {
            $arena.current.appendChild(playerWin());
            generateLogs('draw')
        }
    }
    players();
};

const responseFetch = async (attack) => {
    let { hit, defence } = attack;
    let body = fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            hit,
            defence,
        })
    })
        .then(res => res.json())
    return body;
}

    return(
        <>
            <Orient/>
        <div ref={$arena} className="arenas arena3">
            <button onClick={()=>{window.location.reload()}} className="restart">RESTART</button>
            <form ref={$formFight} className="control" onSubmit={submit}>
                <div className="inputWrap">
                    <h2>HIT</h2>
                    <div className="ul">
                        <input type="radio" name="hit" value="head" id="headHit" required/>
                        <label for="headHit">
                            <span>HEAD</span>
                        </label>
                        <input type="radio" name="hit" value="body" id="bodyHit" required/>
                        <label for="bodyHit">
                            <span>BODY</span>
                        </label>
                        <input type="radio" name="hit" value="foot" id="footHit" required/>
                        <label for="footHit">
                            <span>FOOT</span>
                        </label>
                    </div>
                </div>
                <div className="inputWrap">
                    <h2>defence</h2>
                    <div className="ul">
                        <input type="radio" name="defence" value="head" id="headDefence" required/>
                        <label for="headDefence">
                            <span>HEAD</span>
                        </label>
                        <input type="radio" name="defence" value="body" id="bodyDefence" required/>
                        <label for="bodyDefence">
                            <span>BODY</span>
                        </label>
                        <input type="radio" name="defence" value="foot" id="footDefence" required/>
                        <label for="footDefence">
                            <span>FOOT</span>
                        </label>
                    </div>
                </div>
                <div className="buttonWrap">
                    <button className="button" type="submit">
                        Fight
                    </button>
                </div>
            </form>
        </div>
        <div ref={$chat} className="chat"></div>
        <div className="wall-left"></div>
        <div className="wall-right"></div>
        </>
    
    )
}
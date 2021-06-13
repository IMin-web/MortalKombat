const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');
const player1 = {
    player : 1,
    name : 'SCORPION',
    hp : 100,
    lastHp : function lastHP() {
        return 100 - this.hp;
    },
    img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['Kunai'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name : 'SUB-ZERO',
    hp : 100,
    lastHp : function lastHP() {
        return 100 - this.hp;
    },
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['IceBall'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP,
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

function removeArena(tag){
    $arena.removeChild(document.querySelector(tag));
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj) {
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

function getRandom(num) {
     return Math.ceil(Math.random() * num);
}

function changeHP(num){
    this.hp -= num;
    this.renderHP();
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.elHP().style.width = this.hp + '%';
}

function playerWin(name) {
    const $WinTitle = createElement('div', 'WinTitle');
    if (name) {
        $WinTitle.innerText = name + ' WIN';
    } else {
        $WinTitle.innerText = 'DRAW';
    }

    return $WinTitle;
}

 function createReloadButton() {
     removeArena('.control');
     const $reloadWrap = createElement('div', 'reloadWrap');
     const $buttonReload = createElement('button', 'button')
     $buttonReload.innerText = 'Restart';
     $arena.appendChild($reloadWrap);
     $reloadWrap.appendChild($buttonReload);
     $buttonReload.addEventListener('click', function () {
        window.location.reload();
    })
 }

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}
function timeNow() {
    date = new Date();
    return `[${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}]`
}

function generateLogs(type, player1, player2) {
    function generateText() {
        el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin', el);
    }
    let text = null;
    let el = null;
    switch(type) {
        case 'start' :
            text = logs['start'].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', timeNow());
            generateText();    
            break
        case 'hit' :    
            text = timeNow() + ' ' + logs[type][getRandom(18) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + `[- ${player2.lastHp()}]` + `[${player2.hp} / 100]`;
            generateText();    
            break
        case 'defence' :
            text = timeNow() + ' ' + logs[type][getRandom(8) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name) + `[${player1.lastHp()}]` + `[${player1.hp} / 100]`;
            generateText();    
            break
        case 'end' :
            text = timeNow() + ' ' + logs['end'][getRandom(3) - 1].replace('[playerLose]', player2.name).replace('[playerWins]', player1.name);
            generateText();    
            break
        case 'draw' :
            text = logs['draw'];
            generateText();    
            break
    }
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


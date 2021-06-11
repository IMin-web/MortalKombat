const $arena = document.querySelector('.arenas');
const $formFight = document.querySelector('.control')
const player1 = {
    player : 1,
    name : 'SCORPION',
    hp : 100,
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
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['IceBall'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHP    ,
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
    }
    if (enemy.hit !== attack.defence) {
        player1.changeHP(enemy.value)
    }

     if (player1.hp === 0 || player2.hp === 0){
        createReloadButton();
     }

     if (player1.hp === 0  && player1.hp < player2.hp){
         $arena.appendChild(playerWin(player2.name));
     } else if (player2.hp === 0  && player2.hp < player1.hp){
        $arena.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0  && player1.hp === 0){
        $arena.appendChild(playerWin());
    }
 })


 $arena.appendChild(createPlayer(player1));
 $arena.appendChild(createPlayer(player2));

const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player : 1,
    name : 'SCORPION',
    hp : 100,
    img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['Kunai'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
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
};

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

function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.random() * 20;
    console.log(player.hp)
    $playerLife.style.width = player.hp + '%';
    if (player.hp < 0) {
        if (player.name == player1.name) {
            $arena.appendChild(playerWin(player2.name));
        } else{
        $arena.appendChild(playerWin(player1.name));
        }
        player.hp = 0;
        $randomButton.disabled = true;
    }
}

function playerWin(name) {
    const $WinTitle = createElement('dib', 'WinTitle');
    $WinTitle.innerText = name + ' WIN';
    return $WinTitle;
}

 $randomButton.addEventListener('click', function () {
     changeHP(player1);
     changeHP(player2);
 })

 $arena.appendChild(createPlayer(player1));
 $arena.appendChild(createPlayer(player2));

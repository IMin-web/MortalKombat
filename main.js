const scorpion = {
    name : 'SCORPION',
    hp : 10,
    img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['Kunai'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
};

const subzero = {
    name : 'SUB-ZERO',
    hp : 70,
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['IceBall'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
};

function createPlayer(name, player) {
    const $arena = document.querySelector('.arenas');
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $character = document.createElement('div');
    const $img = document.createElement('img');

$arena.appendChild($player);
    $player.classList.add(name); //<'name'>...</'name'>
    $player.appendChild($progressbar);
        $progressbar.classList.add('progressbar') //<progressbar>...</progressbar>
        $progressbar.appendChild($life);
            $life.classList.add('life'); //<life>...</life>
            $life.style.width = player.hp + '%'; //Значение здоровья у персонажей
        $progressbar.appendChild($name);
            $name.classList.add('name'); //<name>...</name>
            $name.innerText = (player.name); //Имена персонажей
    $player.appendChild($character);
        $character.classList.add('character'); // <character>...</character>
        $character.appendChild($img);
            $img.src = player.img; //Изображение персонажа
}

createPlayer('player1', scorpion);
createPlayer('player2', subzero);
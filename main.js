const scorpion = {
    name : 'SCORPION',
    hp : '10%',
    img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon : ['Kunai'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
};

const subzero = {
    name : 'SUB-ZERO',
    hp : '100%',
    img : 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon : ['IceBall'],
    attack : function attack() {
        console.log(this.name + 'Fight...')
    },
};

    function createPlayer(name, player) {
    const $player = document.createElement('div');
    $player.classList.add(name);
    
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar')
    const $life = document.createElement('div');

    $life.classList.add('life');
    $life.style.width = player.hp;

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = (player.name);

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = player.img;

    const $arena = document.querySelector('.arenas');
    
    $arena.appendChild($player);
    $player.appendChild($progressbar);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($character);
    $character.appendChild($img);

}

createPlayer('player1', scorpion);
createPlayer('player2', subzero);
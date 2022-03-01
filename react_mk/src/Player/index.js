import { createElement } from "../create.js";
export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;

    };
    lastHp = () => {
        return 100 - this.hp;
    };
    attack = () => {
        console.log(this.name + 'Fight...');
    };
    changeHP = (num) => {
        this.hp -= num;
        if (this.hp <= 0) {
            this.hp = 0;
        };
    };
    elHP = () => {
        return document.querySelector('.player' + this.player + ' .life');
    };
    renderHP = () => {

        this.elHP().style.width = this.hp + '%';
    };
    createPlayer = () => {
        const $player = createElement('div', 'player' + this.player);
        const $progressbar = createElement('div', 'progressbar');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $character = createElement('div', 'character_fight');
        const $img = createElement('img');
        $player.appendChild($progressbar);
        $progressbar.appendChild($life);
        $life.style.width = this.hp + '%'; //Значение здоровья у персонажей
        $progressbar.appendChild($name);
        $name.innerText = (this.name); //Имена персонажей
        $player.appendChild($character);
        $character.appendChild($img);
        $img.src = this.img;
        return $player
    };
};

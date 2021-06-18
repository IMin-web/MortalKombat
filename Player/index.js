export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        console.log(this);
    };
    lastHp = () => {
        return 100 - this.hp;
    };
    attack = () => {
        console.log(this.name + 'Fight...');
    };
    changeHP = (num) => {
        this.hp -= num;
        this.renderHP();
    };
    elHP = () => {
        return document.querySelector('.player' + this.player + ' .life');
    };
    renderHP = () => {
        if (this.hp <= 0) {
            this.hp = 0;
        };
        this.elHP().style.width = this.hp + '%';
    };
};

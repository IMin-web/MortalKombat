import { changeHP, renderHP, elHP} from "./hp.js"
export const player1 = {
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

export const player2 = {
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

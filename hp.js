export function changeHP(num){
    this.hp -= num;
    this.renderHP();
}

export function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.elHP().style.width = this.hp + '%';
}
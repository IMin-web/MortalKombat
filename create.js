export let createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}
export let createPlayer = (playerObj) => {
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
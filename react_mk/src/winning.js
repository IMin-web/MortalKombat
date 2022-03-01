import { $arena } from "./arena.js"
import { createElement } from "./create.js"
let removeArena = (tag) => $arena.removeChild(document.querySelector(tag));

export let playerWin = (player) => {
    const $WinTitle = createElement('div', 'WinTitle');
    if (player) {
        $WinTitle.innerText = player.name + ' WIN';
    } else {
        $WinTitle.innerText = 'DRAW';
    }

    return $WinTitle;
}

export let createReloadButton = () => {
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

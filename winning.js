import { $arena } from "./main.js"
import { createElement } from "./main.js"
let removeArena = (tag) => $arena.removeChild(document.querySelector(tag));

export let playerWin = (name) => {
    const $WinTitle = createElement('div', 'WinTitle');
    if (name) {
        $WinTitle.innerText = name + ' WIN';
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

import {Howl} from 'howler';

export const fight = new Howl({
    src: ['./sounds/fight.mp3'],
    autoplay: true,
  });
export const select = new Howl({
    src: ['./sounds/select.mp3'],
    autoplay: true,
  });

export const gameSound = new Howl({
    src: ['./sounds/game.mp3'],
    autoplay: true,
    loop:true,
  });

  export const choos1 = new Howl({
    src: ['./sounds/choose1.mp3'],
  });
  
export const hit = new Howl({
  src: ['./sounds/hit.mp3'],
});
export const defence = new Howl({
  src: ['./sounds/defence.mp3'],
});
export const end = new Howl({
  src: ['./sounds/end.mp3'],
});
export const draw= new Howl({
  src: ['./sounds/draw.mp3'],
});
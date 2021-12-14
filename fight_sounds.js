const fight = new Howl({
    src: ['./sounds/fight.mp3'],
    autoplay: true,
  });

fight.load();

const hit = new Howl({
  src: ['./sounds/hit.mp3'],
});
const defence = new Howl({
  src: ['./sounds/defence.mp3'],
});
const end = new Howl({
  src: ['./sounds/end.mp3'],
});
const draw= new Howl({
  src: ['./sounds/draw.mp3'],
});
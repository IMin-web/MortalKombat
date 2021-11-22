const choos = new Howl({
    src: ['./sounds/choose.mp3'],
    autoplay: true,
  });
choos.load();

  const menu = new Howl({
    src: ['./sounds/menu.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
  });

menu.load();
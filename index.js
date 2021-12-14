const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');
let getRandom = (num) => Math.ceil(Math.random() * num);

function choose(character){
    switch(character) {
        case 'cyrax': cyrax.play()
        break
        case 'jax': jax.play()
        break
        case 'kabal': kabal.play()
        break
        case 'kano': kano.play()
        break
        case 'kunglao': kunglao.play()
        break
        case 'liukang': liukang.play()
        break
        case 'nightwolf': nightwolf.play()
        break
        case 'sektor': sektor.play()
        break
        case 'shangtsung': shangtsung.play()
        break
        case 'sindel': sindel.play()
        break
        case 'smoke': smoke.play()
        break
        case 'sonya': sonya.play()
        break
        case 'stryker': stryker.play()
        break
        case 'subzero': subzero.play()
        break
        case 'subzero1': subzero.play()
        break
        case 'ermac': ermac.play()
        break
        case 'jade': jade.play()
        break
        case 'kitana': kitana.play()
        break
        case 'kunglao': kunglao.play()
        break
        case 'liukang': liukang.play()
        break
        case 'mileena': mileena.play()
        break
        case 'noobsaibot': noob.play()
        break
        case 'rain': rain.play()
        break
        case 'reptile': reptile.play()
        break
        case 'scorpion': scorpion.play()
        break
    }
}

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }
    }
    return $tag;
}

function createEmptyPlayerBlock(item) {
    const el = createElement('div', ['character', 'div11']);
    const img = createElement('img');
    img.src = `http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png`;
    el.addEventListener('click', () => {
        localStorage.setItem('player1', JSON.stringify(item));
        el.classList.add('active');

        setTimeout(() => {
            window.location.pathname = 'fight.html'
        }, 1000);
    });
      el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {

    localStorage.removeItem('player1');
    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
    let imgSrc = null;
    createEmptyPlayerBlock(players[getRandom(23)]);

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            localStorage.setItem('player1', JSON.stringify(item));
            el.classList.add('active');
            choose(imgSrc.slice(imgSrc.lastIndexOf('/')+1, imgSrc.length-4))
            setTimeout(() => {
                window.location.pathname = 'fight.html'
            }, 1500);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();

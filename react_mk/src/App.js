import {useRef, useState, useEffect } from 'react';
import './index.css'
import Fight from './fight'
import {select, choos, menu, cyrax, jax, kabal, kano, kunglao, liukang, nightwolf, sektor, shangtsung, sindel, smoke, sonya, stryker, subzero, ermac, jade, kitana, mileena, noob, rain, reptile, scorpion, choos1} from './index_sounds'
import Orient from './Orient'


export default function App(){
    const hide = useRef();
    const $parent = useRef();
    const $player = useRef();
    const [fight, setFight] = useState(false);
    const [goState, setGoState] = useState(true);

    

    function clickHandler() {
        init();
        const $menuHide = document.getElementById('menu__box')
        const $footer = document.getElementById('footer')
        const $contact = document.getElementById('contact__btn')
        try{
            $menuHide.style.visibility = 'hidden';
            $footer.style.display = 'none';
            $contact.style.display = 'none';
        }
        catch(e){console.log(e)}

        select.play();
        choos.play();
        menu.play();
        setGoState(false);
    }     

    // useEffect(() => {
    //   if (mql.matches) {
    //     console.log("if");
    //     mql.addListener(function () {
    //         console.log(gO)
    //       !gO ? init() : console.log("if no");
    //     });
    //     return;
    //   } else {
    //     console.log("else");
    //     mql.addListener(function () {
    //         // console.log(gO)
    //       gO ? init() : console.log("else no");
    //     });
    //     return;
    //   }
    // },[]);
    
let getRandom = (num) => Math.ceil(Math.random() * num);

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
        $parent.current.appendChild(el);
    }
    
    async function init() {
        try{
        localStorage.removeItem('player1');
    
        const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        
        createEmptyPlayerBlock(players[getRandom(23)])

        let imgSrc = null;
        players.forEach(item => {
            const el = createElement('div', ['character', `div${item.id}`]);
            const img = createElement('img');
            const a = createElement('a')
            el.addEventListener('mousemove', () => {
                if (imgSrc === null) {
                    imgSrc = item.img;
                    const $img = createElement('img');
                    $img.src = imgSrc;
                    $player.current.appendChild($img);
                    select.play()
                }
            });
    
            el.addEventListener('mouseout', () => {
                if (imgSrc) {
                    imgSrc = null;
                    $player.current.innerHTML = '';
                }
            });
    
            el.addEventListener('click', () => {
                localStorage.setItem('player1', JSON.stringify(item));
                el.classList.add('active');
                choose(imgSrc.slice(imgSrc.lastIndexOf('/')+1, imgSrc.length-4))
                setTimeout(() => {
                    setFight(true)
                }, 1500);
            });
    
            img.src = item.avatar;
            img.alt = item.name;
            a.href = '#/projects/mortalkombat/fight'
            
            el.appendChild(img);
            el.appendChild(a)
            
            $parent.current.appendChild(el);
        });
    } catch (e) {alert('Произошла ошибка! Нет связи с сервером!')
window.location.reload()}
    }

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
            default: 
            break
        }
        choos1.play()
    }

    return( 
        <div className="root">
                        <Orient/>

            {fight ? <Fight/>
            :
        <>
        {goState ? <input onClick={clickHandler} type="button" className="go" value="LET'S GO!"></input> : 
        <div ref={hide} className="hide">
        <button onClick={()=>{window.location.reload()}} className="restart">RESTART</button>
            <div className="title">
                SELECT YOUR FIGHTER
            </div>
            <div ref={$player} className="player"></div>
            <div ref ={$parent} className="parent"></div>
            </div>
            } 
            </>
    }
        
    </div>
    )
}
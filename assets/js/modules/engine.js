const button = document.querySelector('#btn-bg');
const text = document.querySelector('#power-text');
const svg = document.querySelector('#hypersquare_svg1');

// namespace Engine stellt sicher das die Funtionsname einmalig sind 
// siehe main.js "Engine.init() vs. Cockpit.init()"

export const Engine = {
    msg: document.querySelector('#power-text'),
    startTime: 0,
    endTime: 0,
    init: () => {
        Engine.addDOMListeners();

    },
    addDOMListeners: (e) => {
        window.addEventListener('touchstart', Engine.start);
        window.addEventListener('touchend', Engine.touchEnd);
    },
    start: (e) => {
        if (e) {
            Engine.startTime = new Date().getTime();

            // changedTouches ist eine Property des Touchevent und ein Array
            // console.log(e.changedTouches);
            [...e.changedTouches].forEach(touch => {
                console.log(touch);
            });
        }

        Engine.msg.innerHTML = '<p>Start</p>';
    },
    touchEnd: (e) => {
        if (e) {

            [...e.changedTouches].forEach(touch => {
                // optimiere den selector
                //console.log(touch.target.closest('.powerbutton > div'));
                Engine.endTime = new Date().getTime();
                if (Engine.endTime - Engine.startTime < 250 && touch.target.closest('.powerbutton > div')) {

                    button.classList.add('active');
                    text.classList.add('active');
                    Engine.msg.innerHTML = '<p>Stop</p>';
                    svg.classList.add('active');

                } else if (Engine.endTime - Engine.startTime > 350 && touch.target.closest('.powerbutton > div')) {
                    button.classList.remove('active');
                    svg.classList.remove('active');
                    text.classList.remove('active');
                    Engine.msg.innerHTML = '<p>Start</p>';


                }
            });

        }
    },
}
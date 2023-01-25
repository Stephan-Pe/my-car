import { Cockpit } from './modules/cockpit.js';
import { Engine } from './modules/engine.js';
import { init, animate } from './modules/canvas.js';
const powerUp = document.querySelector('.hypersquare__display');
const startRoadRunner = document.getElementById('powerUp');

/**
 * finde die Länge des SVG Stroke für die css animation
 */
// var path = document.querySelector('#hypersquare_svg1');
// var length = path.getTotalLength();
// console.log(length);

let onLongTouch;
let timer;
let touchDuration = 500;
function runStreet() {
    timer = setInterval(onLongTouch, touchDuration);

}
function stopStreet() {
    if (timer)
        clearInterval(timer);
}
onLongTouch = function () {
    init(),
        animate()

}
// lade die Funktionen aus den namespaces erst wenn der DOM geladen ist
window.addEventListener('DOMContentLoaded', (e) => {

    powerUp.addEventListener('touchstart', (e) => {

        if (e.target.closest('#powerUp')) {

            [...e.changedTouches].forEach(touch => {
                if (touch.clientY < 660) {
                    startRoadRunner.classList.add('active');
                    runStreet();
                    //console.log('smaller' + touch.clientY);
                }
                else if (touch.clientY > 660) {
                    startRoadRunner.classList.remove('active');
                    stopStreet();
                    //console.log('bigger' + touch.clientY);
                }
            });

        }
    })

    Engine.init();
    Cockpit.init();
});



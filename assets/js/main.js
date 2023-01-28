import { Engine } from './modules/engine.js';
import { init, animate, stopInit } from './modules/canvas.js';
const powerUp = document.querySelector('.hypersquare__display');
const startRoadRunner = document.getElementById('powerUp');

/**
 * finde die Länge des SVG Stroke für die css animation
 */
// var path = document.querySelector('#hypersquare_svg1');
// var length = path.getTotalLength();
// console.log(length);

let callBack;
let timer;
let duration = 3000;
function runStreet() {
    timer = setInterval(callBack, duration);

}
function stopStreet() {
    if (timer)
        clearInterval(timer);
}
callBack = function () {
    init(),
        animate()

}
// lade die Funktionen aus den namespaces erst wenn der DOM geladen ist
window.addEventListener('DOMContentLoaded', (e) => {

    powerUp.addEventListener('touchstart', (e) => {

        if (e.target.closest('#powerUp')) {

            [...e.changedTouches].forEach(touch => {
                if (touch.target.closest('#top')) {
                    startRoadRunner.classList.add('active');
                    runStreet();

                }
                else if (touch.target.closest('#bottom')) {
                    startRoadRunner.classList.remove('active');
                    stopStreet();
                    stopInit();

                }
            });

        }
    })

    Engine.init();

});



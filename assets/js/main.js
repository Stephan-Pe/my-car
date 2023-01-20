const button = document.querySelector('#btn-bg');
const svg = document.querySelector('#hypersquare_svg1');
const text = document.querySelector('#power-text');
const container = document.querySelector('.container');

const activate = () => {
    let startTime, endTime;
    const msg = document.querySelector('#power-text');
    window.addEventListener('mousedown', (e) => {
        startTime = new Date().getTime();
        console.log(e.target);

    });
    window.addEventListener('mouseup', (e) => {
        endTime = new Date().getTime();
        if (endTime - startTime < 250 && e.target.closest('.powerbutton')) {

            button.classList.add('active');
            text.classList.add('active');
            msg.innerHTML = '<p>Stop</p>';
            svg.classList.add('active');
        } else if (endTime - startTime > 350 && e.target.closest('.powerbutton')) {
            button.classList.remove('active');
            svg.classList.remove('active');
            text.classList.remove('active');
            msg.innerHTML = '<p>Start</p>';
        }

    });
    msg.innerHTML = '<p>Start</p>';
}

var path = document.querySelector('#hypersquare_svg1');
var length = path.getTotalLength();

console.log(length);

window.addEventListener('DOMContentLoaded', (e) => { activate() });
const button = document.querySelector('#btn-bg');
const svg = document.querySelector('#hypersquare_svg1');
const text = document.querySelector('#power-text');

export const Cockpit = {

    currentPosition: 0,
    lastKnownPosition: 0,
    hyperSQRBottom: 411,
    wheelAngleFront: 0,
    wheelAngleBack: 0,
    angleBase: 0,
    startTime: 0,
    endTime: 0,
    frontWheels: document.querySelectorAll("[class*='wheel__front--']"),
    backWheels: document.querySelectorAll("[class*='wheel__back--']"),
    steerControl: document.querySelector(".hypersquare__display--touch3"),
    init: () => {
        Cockpit.addDOMListeners();
        Cockpit.start();
        Cockpit.steer();
        Cockpit.removeActive();
    },
    addDOMListeners: (e) => {
        window.addEventListener('touchstart', Cockpit.steer);
        window.addEventListener('touchmove', Cockpit.steer);
        window.addEventListener('touchend', Cockpit.removeActive);
    },
    start: () => {

        const msg = document.querySelector('#power-text');
        window.addEventListener("touchstart", e => {
            Cockpit.startTime = new Date().getTime();
            [...e.changedTouches].forEach(touch => {
                const dot = document.createElement('div')
                dot.classList.add('dot')
                dot.style.top = `${touch.pageY}px`
                dot.style.left = `${touch.pageX}px`
                dot.id = touch.identifier
                document.body.appendChild(dot)
                Cockpit.currentPosition = sessionStorage.setItem('currentPosition', touch.clientY)


            });
        })

        window.addEventListener("touchmove", e => {

            [...e.changedTouches].forEach(touch => {
                const dot = document.getElementById(touch.identifier)
                dot.style.top = `${touch.pageY}px`
                dot.style.left = `${touch.pageX}px`

            });
        })
        window.addEventListener("touchend", e => {

            [...e.changedTouches].forEach(touch => {
                const dot = document.getElementById(touch.identifier)
                dot.remove()

            });
            Cockpit.endTime = new Date().getTime();
            if (Cockpit.endTime - Cockpit.startTime < 250 && e.target.closest('.powerbutton')) {

                button.classList.add('active');
                text.classList.add('active');
                msg.innerHTML = '<p>Stop</p>';
                svg.classList.add('active');
            } else if (Cockpit.endTime - Cockpit.startTime > 350 && e.target.closest('.powerbutton')) {
                button.classList.remove('active');
                svg.classList.remove('active');
                text.classList.remove('active');
                msg.innerHTML = '<p>Start</p>';
            }
        })

        msg.innerHTML = '<p>Start</p>';
    },

    steer: (e) => {

        [...e.changedTouches].forEach(touch => {
            const dot = document.getElementById(touch.identifier)
            if (e.target.closest('.hypersquare__display--touch3')) {
                Cockpit.steerControl.classList.add('active');
                Cockpit.currentPosition = Math.round(touch.clientY)
                Cockpit.angleBase = Cockpit.hyperSQRBottom - Cockpit.currentPosition;
                Cockpit.wheelAngleFront = Math.abs(Cockpit.angleBase) / 6.5;
                Cockpit.wheelAngleBack = Math.abs(Cockpit.angleBase) / 32;
                [...Cockpit.frontWheels].forEach(wheel => {
                    if (Cockpit.currentPosition <= 411) {
                        wheel.style.transform = `rotateZ(${Cockpit.wheelAngleFront}deg)`;
                    } else if (Cockpit.currentPosition >= 411) {
                        wheel.style.transform = `rotateZ(-${Cockpit.wheelAngleFront}deg)`;
                    }
                });
                [...Cockpit.backWheels].forEach(wheel => {
                    if (Cockpit.currentPosition <= 411) {
                        wheel.style.transform = `rotateZ(-${Cockpit.wheelAngleBack}deg)`;
                    } else if (Cockpit.currentPosition >= 411) {
                        wheel.style.transform = `rotateZ(${Cockpit.wheelAngleBack}deg)`;
                    }
                });

                console.log(e);



            }

        });


    },
    removeActive: (e) => {
        if (e.target.closest('.hypersquare__display--touch3')) {
            Cockpit.steerControl.classList.remove('active');
            [...Cockpit.frontWheels].forEach(wheel => {
                wheel.style.transform = `rotateZ(0deg)`;
            });
            [...Cockpit.backWheels].forEach(wheel => {
                wheel.style.transform = `rotateZ(0deg)`;
            });
        }
    }
}
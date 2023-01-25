export const Cockpit = {

    currentPosition: 0,
    lastKnownPosition: 0,
    steerControlBottom: 411,
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
    },
    addDOMListeners: (e) => {
        window.addEventListener('touchstart', Cockpit.steer);
        window.addEventListener('touchstart', Cockpit.touchStart);
        window.addEventListener('touchmove', Cockpit.steer);
        window.addEventListener('touchmove', Cockpit.touchUpdate);
        window.addEventListener('touchend', Cockpit.touchEnd);
    },
    touchStart: (e) => {

        if (e) {

            [...e.changedTouches].forEach(touch => {

                const dot = document.createElement('div')
                dot.classList.add('dot')
                dot.style.top = `${touch.pageY}px`
                dot.style.left = `${touch.pageX}px`
                dot.id = touch.identifier
                document.body.appendChild(dot)
                Cockpit.currentPosition = sessionStorage.setItem('currentPosition', touch.clientY)

            });
        }

    },
    touchUpdate: (e) => {
        if (e) {
            [...e.changedTouches].forEach(touch => {
                const dot = document.getElementById(touch.identifier)
                dot.style.top = `${touch.pageY}px`
                dot.style.left = `${touch.pageX}px`

            });
        }
    },
    touchEnd: (e) => {
        if (e) {
            Cockpit.steerControl.classList.remove('active');
            [...e.changedTouches].forEach(touch => {
                const dot = document.getElementById(touch.identifier)
                dot.remove();

                [...Cockpit.frontWheels].forEach(wheel => {
                    wheel.style.transform = `rotateZ(0deg)`;
                });
                [...Cockpit.backWheels].forEach(wheel => {
                    wheel.style.transform = `rotateZ(0deg)`;
                });

            });
        }
    },


    steer: (e) => {
        if (e) {
            [...e.changedTouches].forEach(touch => {
                const dot = document.getElementById(touch.identifier)
                if (e.target.closest('.hypersquare__display--touch3')) {
                    Cockpit.steerControl.classList.add('active');
                    Cockpit.currentPosition = Math.round(touch.clientY)
                    Cockpit.angleBase = Cockpit.steerControlBottom - Cockpit.currentPosition;
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
                }

            });
        }



    },
}
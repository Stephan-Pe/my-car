export const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
let lineArray = [];
canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

// in der class Rectangle kannst Du den Context konstruieren
class Rectangle {
    constructor() {
        this.rectPos = Math.round(canvas.width / 2) - 40;

        this.rectY = 0;
        this.speedX = 5;

    }
    update() {
        this.rectPos += 0;
        this.rectY += this.speedX;
    }
    draw() {

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(this.rectPos, this.rectY, 60, 300);// als alternative kann man auch Kreise zeichnen ctx.arc(100, 75, 50, 0, 2 * Math.PI);

    }
}

export function init() {
    // falls der User den Browser verkleinert ruft man die resize function auf

    window.addEventListener('resize', function () {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(rectPos, 50, 80, 400);

    })
    lineArray.push(new Rectangle());


    console.log(lineArray);
}
export function handleRectangles() {
    for (let index = 0; index < lineArray.length; index++) {
        lineArray[index].update();
        lineArray[index].draw();

    }
}
export function stopInit() {
    lineArray = [];
}
// hier wird ein loop generiert
export function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleRectangles();
    requestAnimationFrame(animate);
}

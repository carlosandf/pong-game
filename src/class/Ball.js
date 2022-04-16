const Initial = 0.025;
const Increase = 0.00001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.velocity;
        this.reset();
        this.rect();
    }

    get x () {
        return (
            parseFloat(getComputedStyle(this.ballElem)
                .getPropertyValue("--x"))
        )
    }

    set x (value) {
        this.ballElem.style.setProperty("--x", value);
    }

    get y () {
        return (
            parseFloat(getComputedStyle(this.ballElem)
                .getPropertyValue("--y"))
        )
    }

    set y (value) {
        this.ballElem.style.setProperty("--y", value);
    }

    rect () {
        return this.ballElem.getBoundingClientRect();
    }

    reset () {
        this.x = 50
        this.y = 50
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
            const heading = randomNumber(0, 2 * Math.PI);
            this.direction = {
                x: Math.cos(heading),
                y: Math.sin(heading)
            }
        }
        this.velocity = Initial;
    }

    update(d, paddleRects) {

        this.x += this.direction.x * this.velocity * d;
        this.y += this.direction.y * this.velocity * d;
        this.velocity += Increase * d;

        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) this.direction.y *= -1;

        if (paddleRects.some(r => touch(r, rect))) this.direction.x *= -1;
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function touch(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}
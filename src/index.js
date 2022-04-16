import Ball from "@class/Ball.js";
import Paddle from "@class/Paddle.js";
import '@styles/main.css'


const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const machinePaddle = new Paddle(document.getElementById("machine-paddle"));
const playerScore = document.getElementById("player-score");
const machineScore = document.getElementById("machine-score");

let last
const update = time => {
    if (last) {
        const d = time - last;
        ball.update(d, [playerPaddle.rect(), machinePaddle.rect()]);
        machinePaddle.update(d, ball.y);

        if (isLose()) handleLose();
    }

    last = time;
    window.requestAnimationFrame(update);
}

const isLose = () => {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
}

const handleLose = () => {
    const rect = ball.rect();

    (rect.right >= window.innerWidth)
        ? playerScore.textContent = parseInt(playerScore.textContent) + 1
        : machineScore.textContent = parseInt(machineScore.textContent) + 1
    
    ball.reset();
    machinePaddle.reset();
}

document.addEventListener("mousemove", e => {
    //console.log(e)
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

const up = paddle => paddle.position - 20;

const down = paddle => paddle.position + 20;

document.addEventListener('keydown', e => {
    (e.code == 'ArrowUp')
        ? playerPaddle.position = up(playerPaddle)
        : playerPaddle.position = down(playerPaddle)
})

window.requestAnimationFrame(update);
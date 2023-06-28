const c = document.createElement("canvas");
c.id = "game-container";
const ctx = c.getContext("2d");

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
c.width = screenWidth;
c.height = screenHeight;
document.body.appendChild(c);
// document.getElementById('game-container').appendChild(c);

window.addEventListener('keydown', this.keydown, false);
window.addEventListener('keyup', this.keyup, false);

//Variables
const gravity = 0.34;
var holdingLeftKey = false;
var holdingRightKey = false;
var keycode;
var dead = false;
var difficulty = 0;
var lowestBlock = 0;
var score = 0;
var yDistanceTravelled = 0;
let gameoverActionDone = false;
var blocks = [];
var powerups = [];
let pause = true;
//Time variables
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;

function showScore() {
    if (yDistanceTravelled > score) {
        score = Math.round(yDistanceTravelled / 100);
    }

    ctx.font = "36px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(score, 15, 40);
}

blocks.push(new block);
blocks[0].x = screenWidth / 2 - 50;
blocks[0].y = screenHeight - 50;
blocks[0].monster = 0;
blocks[0].type = 0;
blocks[0].powerup = 0;

blockSpawner();

function loop() {
    requestAnimationFrame(loop);

    //This sets the FPS to 60
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        ctx.clearRect(0, 0, screenWidth, screenHeight);
        for (var i = 0; i < blocks.length; i++) {
            if (blocks[i] !== 0) {
                blocks[i].update();
                blocks[i].draw();
            }
        }
        if (pause) {
            return;
        }
        player.update();
        player.draw();

        showScore();

        ctx.fill();
        then = now - (delta % interval);
    }

}

loop();

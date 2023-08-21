function rangesOverlap(range1, range2) {
    return (range1.start <= range2.end && range1.end >= range2.start) ||
        (range2.start <= range1.end && range2.end >= range1.start);
}
function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
}
const playerImg = new Image();

playerImg.src = "Sprites/players.png";
let playerId = generateRandomInteger(1, 25);
var player = new function () {
    let gravity = 0.9;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight - 200;
    this.img = playerImg;
    this.playerId = playerId;
    this.frameX = playerFrames["player " + this.playerId + ".png"].frame.x;
    this.frameY = playerFrames["player " + this.playerId + ".png"].frame.y;
    this.frameW = playerFrames["player " + this.playerId + ".png"].frame.w;
    this.frameH = playerFrames["player " + this.playerId + ".png"].frame.h;
    this.width = 80;
    this.height = this.width * this.frameH / this.frameW;
    this.xSpeed = 6.7;
    this.ySpeed = 0;
    this.springBootsDurability = 0;
    this.flyingHatDurability = 0;
    this.rocketDurability = 0;
    this.flyingHatySpeed = - Math.sqrt(40 * 40 * gravity / 0.34);
    this.rocketySpeed = - Math.sqrt(60 * 60 * gravity / 0.34);
    this.flyingHatDistance = 0.5 * this.flyingHatySpeed * this.flyingHatySpeed / gravity;
    this.rocketDistance = 0.5 * this.rocketySpeed * this.rocketySpeed / gravity;
    this.direction = "left";
    this.inPowerup = false;

    this.update = function () {
        if (!dead) {
            this.ySpeed += gravity;
            if (this.y <= screen.height / 2 - 200 && this.ySpeed <= 0) {
                for (var i = 0; i < blocks.length; i++) {
                    blocks[i].y -= this.ySpeed;
                }
            } else {
                this.y += this.ySpeed;
            }
            yDistanceTravelled -= this.ySpeed;
            if (this.flyingHatDurability > 0) {
                this.flyingHatDurability += this.ySpeed;
                if (this.ySpeed >= 0) {
                    this.flyingHatDurability = 0;
                }
            }
            if (this.rocketDurability > 0) {
                this.rocketDurability += this.ySpeed;
                if (this.ySpeed >= 0) {
                    this.rocketDurability = 0;
                }
            }
        } else {
            // gameover
            const endTime = Date.now();
            ctx.font = "60px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", screenWidth / 2, screenHeight / 2);
            if (!gameoverActionDone) {
                try {
                    // return score to flutter
                    window.flutter_inappwebview
                        .callHandler('returnScore', score, startTime, endTime);
                } catch (error) {
                    console.error(error);
                }
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
                gameoverActionDone = true;
            }

        }

        //Check for jump
        for (var i = 0; i < blocks.length; i++) {
            if (this.ySpeed >= 0) {
                if (this.x >= blocks[i].x - this.width + 10 && this.x <= blocks[i].x + blocks[i].width - 10 &&
                    this.y >= blocks[i].y - this.height - 8 && this.y <= blocks[i].y + blocks[i].height + 8 - this.height) {
                    if (["spring", "springBoots", "flyingHat", "rocket"].includes(blocks[i].powerup)) {
                        this.inPowerup = true;
                    } else {
                        this.inPowerup = false;
                    }
                    if (blocks[i].type === "break") {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i] = 0;
                        console.log('break');
                    } else if (blocks[i].monster !== 0) {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i] = 0;
                    } else if (blocks[i].playerId > 0) {
                        this.playerId = blocks[i].playerId;
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i].powerup = 0;
                    } else {
                        this.jump(blocks[i].powerup, blocks[i].type);
                        blocks[i].powerup = 0;
                    }

                }
            }
            if (this.y > blocks[i].y) {
                //Check for hit monster, when no powerup
                if (!this.inPowerup && blocks[i].monster !== 0 && blocks[i].monster !== undefined && this.springBootsDurability == 0 && this.flyingHatDurability == 0 && this.rocketDurability == 0) {
                    const isXOverlap = rangesOverlap({ start: this.x + 10, end: this.x + this.width - 10 }, { start: blocks[i].x + 10, end: blocks[i].x + 50 - 10 });
                    const isYOverlap = rangesOverlap({ start: this.y + 10, end: this.y + this.height - 10 }, { start: blocks[i].y + 10, end: blocks[i].y + 50 - 10 });
                    if (isXOverlap && isYOverlap) {
                        dead = true;
                    }
                }
            }
        }


        for (var i = blocks.length - 1; i > 0; i--) {
            if (blocks[i].y > screenHeight) {
                lowestBlock = i;
                break;
            }
        }

        if (this.y >= screenHeight - 70) {
            dead = true;
        }

        if (lowestBlock >= 45) {
            if (difficulty < 8) {
                difficulty += 1;
            }
            blockSpawner();
        }
    }

    this.jump = function (powerup, type) {
        // base gravity is 0.34
        this.ySpeed = - Math.sqrt(13.3 * 13.3 * gravity / 0.34);

        // powerup priority changePlayer > rocket > flyingHat > springBoots
        if (powerup === "changePlayer") {
            this.springBootsDurability = 0;
            this.flyingHatDurability = 0;
            this.rocketDurability = 0;
            this.frameX = playerFrames["player " + this.playerId + ".png"].frame.x;
            this.frameY = playerFrames["player " + this.playerId + ".png"].frame.y;
            this.frameW = playerFrames["player " + this.playerId + ".png"].frame.w;
            this.frameH = playerFrames["player " + this.playerId + ".png"].frame.h;
        }
        if (powerup === "springBoots") {
            this.springBootsDurability = 6;
        }
        if (powerup === "flyingHat") {
            this.springBootsDurability = 0;
            this.flyingHatDurability = this.flyingHatDistance;
        }
        if (powerup === "rocket") {
            this.springBootsDurability = 0;
            this.flyingHatDurability = 0;
            this.rocketDurability = this.rocketDistance;
        }

        if (type === 0) {
            if (powerup === "spring") {
                this.ySpeed = -Math.sqrt(20 * 20 * gravity / 0.34);
            }
            if (powerup === "flyingHat") {
                this.ySpeed = this.flyingHatySpeed;
            }
            if (powerup === "rocket") {
                this.ySpeed = this.rocketySpeed;
            }
        }

        if (this.springBootsDurability !== 0) {
            this.ySpeed = - Math.sqrt(20 * 20 * gravity / 0.34);
            this.springBootsDurability -= 1;
        }
    }

    this.draw = function () {
        ctx.drawImage(this.img, this.frameX, this.frameY, this.frameW, this.frameH, this.x, this.y, this.width, this.height);
        // check pringBoots, flyingHat, and rocket
        if (this.springBootsDurability !== 0) {
            ctx.drawImage(springBootsImg, this.x + 25, this.y + this.height - 10, 30, 30);
        }
        if (this.flyingHatDurability > 0) {
            ctx.drawImage(flyingHatImg, this.x + 20, this.y - 30 + 5, 40, 30);
        }
        if (this.rocketDurability > 0) {
            ctx.drawImage(rocketImg, this.x + 20, this.y - 30 + 5, 40, 30);
        }
    }
}

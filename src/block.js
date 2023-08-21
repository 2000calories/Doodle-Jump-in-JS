function block() {
    this.x;
    this.y;
    this.width = Math.min(window.innerWidth * 0.3, 100);
    this.height = 20;
    this.powerup;
    this.type;
    this.monster;
    this.direction = "right";
    this.moveTime = 10;
    this.playerId = 0;
    this.randomId = generateRandomInteger(1, 25);

    this.draw = function () {
        if (this.type === "break") {
            ctx.fillStyle = "#876537";
        } else if (this.type === "sideways") {
            ctx.fillStyle = "#14a7c8";
        } else {
            ctx.fillStyle = "#6fbb1d";
        }

        if (this.monster === 0) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
            monsterFunctions[this.monster].draw(this.x, this.y);
        }

        switch (this.powerup) {
            case 'spring':
                ctx.drawImage(springImg, this.x + 35, this.y - 30, 30, 30);
                break;
            case 'springBoots':
                ctx.drawImage(springBootsImg, this.x + 35, this.y - 40, 40, 40);
                break;
            case 'flyingHat':
                ctx.drawImage(flyingHatImg, this.x + 35, this.y - 30, 40, 30);
                break;
            case 'rocket':
                ctx.drawImage(rocketImg, this.x + 35, this.y - 30, 40, 30);
                break;
            case 'changePlayer':
                while (this.randomId == playerId) {
                    this.randomId = generateRandomInteger(1, 25);
                }
                this.playerId = this.randomId;
                frameX = playerFrames["player " + this.playerId + ".png"].frame.x;
                frameY = playerFrames["player " + this.playerId + ".png"].frame.y;
                frameW = playerFrames["player " + this.playerId + ".png"].frame.w;
                frameH = playerFrames["player " + this.playerId + ".png"].frame.h;
                ctx.drawImage(playerImg, frameX, frameY, frameW, frameH, this.x + 35, this.y - 40, 40 * frameW / frameH, 40);
                break;
            default:
        }
    }

    this.update = function () {
        if (this.type === "sideways") {
            if (this.x >= screenWidth - this.width) {
                this.direction = "left";
            } else if (this.x <= 0) {
                this.direction = "right";
            }

            if (this.direction === "right") {
                this.x += 2.5 * Math.sqrt(difficulty + 1);
            } else {
                this.x -= 2.5 * Math.sqrt(difficulty + 1);
            }
        }

        if (this.monster === "smallRed") {
            if (this.direction === "right") {
                this.x += 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "left";
                    this.moveTime = 10;
                }
            } else {
                this.x -= 1;
                this.moveTime -= 1;

                if (this.moveTime === 0) {
                    this.direction = "right";
                    this.moveTime = 10;
                }
            }
        }
    }
}

var monsterChances = {
    "smallRed": 30
};

function spawnMonster() {
    if (Math.round(Math.random() * monsterChances["smallRed"]) === 0) {
        monsterChances["smallRed"] = 30;
        return "smallRed";
    } else {
        monsterChances["smallRed"] *= 0.98;
    }
    return 0;
}

var smallRed = new function () {
    this.img = new Image();
    this.img.src = "Sprites/Monsters/virus1.png";
    this.xDif = 0;
    this.yDif = 0;
    this.width = 50;
    this.height = 50;

    this.draw = function (blockX, blockY) {
        ctx.drawImage(this.img, blockX + this.xDif, blockY + this.yDif, this.width, this.height);
    }
}

var monsterFunctions = {
    "smallRed": smallRed
}
var LivingCreature = require("./livingCreature");
var random = require("./random.js");

module.exports = class Grass extends LivingCreature {
    mul() {
        let 
        empty = this.chooseCell(0),
        randomEmpty = random(empty);

        this.multiply++;

        if(randomEmpty && this.multiply > this.grassMaxMultiply) {
            let 
            x = randomEmpty[0],
            y = randomEmpty[1];
            matrix[y][x] = 1;
            let grass = new Grass(x,y);
            grassArr.push(grass);

            this.multiply = 0;
        }
        
    }

    grassChangeSpeed(n) {
        this.grassMaxMultiply = n;
    }
}
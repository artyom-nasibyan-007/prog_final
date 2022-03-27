var LivingCreature = require("./livingCreature");
var random = require("./random");

module.exports = class GrassEater extends LivingCreature {

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }

    mul() {
        let
            found = this.chooseCell(0),
            foundRand = random(found);

        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2;
            let eater = new GrassEater(x, y);
            eaterArr.push(eater);
            this.eaterEnergy = 8;
        }
    }

    move() {
        this.eaterEnergy--;
        var
            emptyCells = this.chooseCell(0),
            newCell = random(emptyCells);

        if (newCell && this.eaterEnergy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

        else {
            this.die();
        }
    }

    eat() {
        var
            emptyCells = this.chooseCell(1),
            newCell = random(emptyCells),
            holeCells = this.chooseCell(6),
            newHole = random(holeCells);

            if (newHole && this.eaterEnergy >= 0) {
                matrix[this.y][this.x] = 0;
                for (var i in eaterArr) {
                    if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                        eaterArr.splice(i, 1);
                        break;
                    }
                }
        
            }    
        else if (newCell) {
            this.eaterEnergy+=2;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 3);
                    break;
                }
            }

            if (this.eaterEnergy >= 16) {
                this.mul();
            }

        }

        else {
            this.move();
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1);
                break;
            }
        }
    }
}
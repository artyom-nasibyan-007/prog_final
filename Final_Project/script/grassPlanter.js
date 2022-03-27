var 
LivingCreature = require("./livingCreature"),
random = require("./random"),
Grass = require("./grass");

module.exports = class GrassPlanter extends LivingCreature{

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

    chooseAllCells() {
        

        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            this.getNewCoordinates();
            let
                x = this.directions[i][0],
                y = this.directions[i][1];

            if (matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 2 || matrix[y][x] == 3 || matrix[y][x] == 5) {
                found.push(this.directions[i]);
            }
        }

        return found;
    }

    chooseCell(char) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            this.getNewCoordinates();
            let
                x = this.directions[i][0],
                y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;
    }

    move() {
        this.planterEnergy--;
        var
            emptyCells = this.chooseCell(0),
            newCell = random(emptyCells),
            grassCells = this.chooseCell(1),
            newGrass = random(grassCells),
            holeCells = this.chooseCell(6),
            newHole = random(holeCells);


            if (newHole && this.planterEnergy >= 0) {
                matrix[this.y][this.x] = 0;
                for (var i in planterArr) {
                    if (this.x == planterArr[i].x && this.x == planterArr[i].y) {
                        planterArr.splice(i, 1);
                        break;
                    }
                }
        
            } 
        else if (newCell && this.planterEnergy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }

        else if(newGrass && this.planterEnergy > 0) {
            var newX = newGrass[0];
            var newY = newGrass[1];
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 1;
            this.x = newX;
            this.y = newY;
        }

        else {
            this.boom();
        }
    }

    boom() {
        let
        found = this.chooseAllCells();

        for(let i in found) {
            let 
            x = found[i][0],
            y = found[i][1];

            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);

            this.die();
        }
        this.planterEnergy = 20;
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in planterArr) {
            if (this.x == planterArr[i].x && this.y == planterArr[i].y) {
                planterArr.splice(i, 1);
                break;
            }
        }
    }
}
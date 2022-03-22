class Predator extends LivingCreature {

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
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
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
        this.predatorEnergy--;
        var
            emptyCells = this.chooseCell(0),
            newCell = random(emptyCells);

        if (newCell && this.predatorEnergy > 0) {
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
            emptyCells = this.chooseCell(2),
            grassCells = this.chooseCell(1),
            planterCells = this.chooseCell(4),
            holeCells = this.chooseCell(6),
            newCell = random(emptyCells),
            newGrass = random(grassCells),
            newPlanter = random(planterCells),
            newHole = random(holeCells);


        if (newHole && this.predatorEnergy >= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
    
        }
        if (newCell && this.predatorEnergy >= 0) {
            this.predatorEnergy++;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }

        }

        else if (newPlanter && this.predatorEnergy >= 0) {
            this.predatorEnergy++;
            var newX = newPlanter[0];
            var newY = newPlanter[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in planterArr) {
                if (newX == planterArr[i].x && newY == planterArr[i].y) {
                    planterArr.splice(i, 1);
                    break;
                }
            }

        }

        else if (newGrass && this.predatorEnergy >= 0) {
            this.predatorEnergy++;
            var newX = newGrass[0];
            var newY = newGrass[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        }

        else {
            this.move();
        }


    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
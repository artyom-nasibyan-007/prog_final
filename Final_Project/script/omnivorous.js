class Omnivorous extends LivingCreature {

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
        this.getNewCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let
                x = this.directions[i][0],
                y = this.directions[i][1];

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 2 || matrix[y][x] == 3 || matrix[y][x] == 4) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;
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

    eat() {
        var
            grassCells = this.chooseCell(1),
            eaterCells = this.chooseCell(2),
            predatorCells = this.chooseCell(3),
            planterCells = this.chooseCell(4),
            newGrass = random(grassCells),
            newEater = random(eaterCells),
            newPredator = random(predatorCells),
            newPlanter = random(planterCells);

        if (newEater && this.omnivorousEnergy >= 0) {
            this.omnivorousEnergy--;
            var newX = newEater[0];
            var newY = newEater[1];
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

        else if (newPredator && this.omnivorousEnergy >= 0) {
            this.omnivorousEnergy--;
            var newX = newPredator[0];
            var newY = newPredator[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        }

        else if (newPlanter && this.omnivorousEnergy >= 0) {
            this.omnivorousEnergy--;
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

        else if (newGrass && this.omnivorousEnergy >= 0) {
            this.omnivorousEnergy--;
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

    move() {
        this.omnivorousEnergy--;
        var
            emptyCells = this.chooseAllCells(),
            newCell = random(emptyCells);

        if (newCell && this.omnivorousEnergy > 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
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

            let hole = new Hole(x, y);
            hole.add();

            this.die();
        }
        this.omnivorousEnergy = 35;
    }

    die() {
        matrix[this.y][this.x] = 6;

        let thisHole = new Hole(this.x, this.y);
        thisHole.add();

        for (let i in omnivorousArr) {
            if (this.x == omnivorousArr[i].x && this.y == omnivorousArr[i].y) {
                omnivorousArr.splice(i, 1);
                break;
            }
        }
    }
}
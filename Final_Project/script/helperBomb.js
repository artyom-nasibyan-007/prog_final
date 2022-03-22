class HelperBomb {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.mul = 0;

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

            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 2 || matrix[y][x] == 3 || matrix[y][x] == 4 || matrix[y][x] == 5) {
                    found.push(this.directions[i]);
                }

            }
        }

        return found;
    }

    add() {
        matrix[this.y][this.x] = 8;
        let bomb = new HelperBomb(this.x,this.y);
        helperBombArr.push(bomb);


        this.boom()
    }

    boom() {
        let
        found = this.chooseAllCells();

        setTimeout(() => {
            for(let i in found) {
                let 
                x = found[i][0],
                y = found[i][1];

                matrix[y][x] = 2;
                let eater = new GrassEater(x, y);
                eaterArr.push(eater);

                this.die();
            }
        },3000)
        this.energy = 20;
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in helperBombArr) {
            if (this.x == helperBombArr[i].x && this.y == helperBombArr[i].y) {
                helperBombArr.splice(i, 1);
                break;
            }
        }
    }
}
class Hole {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add() {
        matrix[this.y][this.x] = 6;
        let hole = new Hole(this.x,this.y);
        holeArr.push(hole);

        for(let i in holeArr) {
            if(this.x == holeArr[i].x && this.y == holeArr[i].y) {
                holeArr[i].splice 
            }
        }
    }
}
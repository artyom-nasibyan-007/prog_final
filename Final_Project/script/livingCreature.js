class LivingCreature {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.multiply = 0;

        this.bombCount = 0;

        this.eaterEnergy = 8;
        this.planterEnergy = 10;
        this.omnivorousEnergy = 35;
        this.predatorEnergy = 125;
        this.helperEnergy = 60;

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
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}
    

let
matrix = [],
grassArr = [],
eaterArr = [],
predatorArr = [],
planterArr = [],
holeArr = [],
omnivorousArr = [],
eaterHelperArr = [],
helperBombArr = [],
spawn = {
    grass:40,
    eater:10,
    predator:3,
    planter:1,
    omnivorous:1,
    helper:1
};

const block = 10;

function autoSize(x,y) {
    for(let i = 0;i < y;i++) {
        matrix.push([])
        for(let j = 0;j < x;j++) {
            matrix[i].push(0)
        }
    }
}

function setup() {
    frameRate(60)
    autoSize(50,50)
    createCanvas(matrix[0].length * block + 1,matrix.length * block + 1);
    background("gray");

    //GRASS SPAWN
    
    for(let i = 0;i < spawn.grass;i++) {
        let
        xRand = Math.floor(Math.random() * matrix[0].length),
        yRand = Math.floor(Math.random() * matrix.length);
        
        matrix[yRand][xRand] = 1;
    }

    //EATER SPAWN

    for(i = 0;i < spawn.eater;i++) {
        let
        xRand = Math.floor(Math.random() * matrix[0].length),
        yRand = Math.floor(Math.random() * matrix.length);
        
        matrix[yRand][xRand] = 2;
    }

    //PREDATOR SPAWN

    for(i = 0;i < spawn.predator;i++) {
        let
        xRand = Math.floor(Math.random() * matrix[0].length),
        yRand = Math.floor(Math.random() * matrix.length);
        
        matrix[yRand][xRand] = 3;
    }

    //OMNIVOROUS SPAWN

    for(i = 0;i < spawn.omnivorous;i++) {
    let
    xRand = Math.floor(Math.random() * matrix[0].length),
    yRand = Math.floor(Math.random() * matrix.length);
        
    matrix[yRand][xRand] = 5;
    }

    
    //OMNIVOROUS SPAWN


    //OBJECT SPAWN


    for(let y = 0;y < matrix.length;y++) {
        for(let x = 0;x < matrix[y].length;x++) {

            if(matrix[y][x] == 1) {
                let grass = new Grass(x,y);
                grassArr.push(grass);
            }
            else if(matrix[y][x] == 2) {
                let eater = new GrassEater(x,y);
                eaterArr.push(eater);
            }
            else if(matrix[y][x] == 3) {
                let predator = new Predator(x,y);
                predatorArr.push(predator);
            }
            else if(matrix[y][x] == 5) {
                let predator = new Omnivorous(x,y);
                predatorArr.push(predator);
            }
        }
    }
}

function draw() {
    for(let y = 0; y < matrix.length;y++) {
        for(let x = 0; x < matrix[y].length;x++) {
            if(matrix[y][x] == 1) {
                fill("green");
            }
            else if(matrix[y][x] == 2) {
                fill("yellow")
            }
            else if(matrix[y][x] == 3) {
                fill("black")
            }
            else if(matrix[y][x] == 4) {
                fill("red");
            }
            else if(matrix[y][x] == 5) {
                fill("blue");
            }
            else if(matrix[y][x] == 6) {
                fill("#555555");
            }
            else if(matrix[y][x] == 7) {
                fill("orange");
            }
            else if(matrix[y][x] == 8) {
                fill("yellowgreen");
            }
            else if(matrix[y][x] == 0) {
                fill("gray")
            }
            noStroke();
            rect(x * block, y * block, block, block);
        }
    }

    for(let i in grassArr) {
        grassArr[i].mul();
    }
    i = 0;
    for(let i in eaterArr) {
        eaterArr[i].eat();
    }
    i = 0;
    for(let i in predatorArr) {
        predatorArr[i].eat();
    }
    i = 0;
    for(let i in planterArr) {
        planterArr[i].move();
    }
    i = 0;
    for(let i in omnivorousArr) {
        omnivorousArr[i].eat();
    }
    i = 0;
    for(let i in eaterHelperArr) {
        eaterHelperArr[i].move();
    }
}


    let timeout1 = setTimeout(function(){
        let int = setInterval(() => {            
            if(grassArr.length <= 200) {
                for(let n = 0;n < spawn.planter;n++) {         
                    let
                    xRand = Math.floor(Math.random() * matrix[0].length),
                    yRand = Math.floor(Math.random() * matrix.length);
            
                    if(matrix[yRand][xRand] == 0) {
                        matrix[yRand][xRand] = 4;
                        let planter = new GrassPlanter(xRand,yRand);
                        planterArr.push(planter); 
                        clearInterval(int);
                        clearTimeout(timeout1);
                    }
                    else;
                }
            }
        },10)
    },3000)

    let timeout2 = setTimeout(function(){
        let int2 = setInterval(() => {            
            if(eaterArr.length <= 200) {
                for(let n = 0;n < spawn.helper;n++) {         
                    let
                    xRand = Math.floor(Math.random() * matrix[0].length),
                    yRand = Math.floor(Math.random() * matrix.length);
            
                    if(matrix[yRand][xRand] == 0) {
                        matrix[yRand][xRand] = 7;
                        let helper = new EaterHelper(xRand,yRand);
                        eaterHelperArr.push(helper); 
                        clearInterval(int2);
                        clearTimeout(timeout2);
                    }
                    else;
                }
            }
        },10)
    },6000)



setTimeout(function(){
    let int = setInterval(() => {
        if(eaterArr.length == 0 && grassArr.length != 0) {
            alert("Planters Won");
            clearInterval(int);
        }
        else if(grassArr.length == 0 && eaterArr.length != 0 && planterArr == 0) {
            alert("Eaters Won");
            clearInterval(int);
        }    
    },1)
},200)
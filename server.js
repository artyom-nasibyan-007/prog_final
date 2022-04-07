var 
Grass = require("./Final_Project/script/grass"),
GrassEater = require("./Final_Project/script/grassEater"),
GrassPlanter = require("./Final_Project/script/grassPlanter"),
HelperBomb = require("./Final_Project/script/helperBomb"),
Hole = require("./Final_Project/script/hole"),
EaterHelper = require("./Final_Project/script/eaterHelper"),
LivingCreature = require("./Final_Project/script/livingCreature"),
Omnivorous = require("./Final_Project/script/omnivorous"),
Predator = require("./Final_Project/script/predator"),
spawn = {
    grass:40,
    eater:10,
    predator:3,
    planter:1,
    omnivorous:1,
    helper:1
},
matrixSize = {
    x:50,
    y:50
}

matrix = [];
grassArr = [];
eaterArr = [];
predatorArr = [];
planterArr = [];
holeArr = [];
omnivorousArr = [];
eaterHelperArr = [];
helperBombArr = [];

const { clear } = require("console");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require("socket.io")(server);
app.use(express.static("Final_Project"));
app.get('/', function (req, res) {
    res.redirect('game.html');
});
server.listen(3050);

function matrixGen() {

    function autoSize() {
        for(let i = 0;i < matrixSize.y;i++) {
            matrix.push([])
            for(let j = 0;j < matrixSize.x;j++) {
                matrix[i].push(0)
            }
        }
    }
    autoSize(50,50)

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
},1500)

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
},4500)

}

matrixGen()

function game() {
    for(let i in grassArr) {
        grassArr[i].mul();
    }
    for(let i in eaterArr) {
        eaterArr[i].eat();
    }
    for(let i in predatorArr) {
        predatorArr[i].eat();
    }
    for(let i in planterArr) {
        planterArr[i].move();
    }
    for(let i in omnivorousArr) {
        omnivorousArr[i].eat();
    }
    for(let i in eaterHelperArr) {
        eaterHelperArr[i].move();
    }
    
    io.sockets.emit("matrix", matrix);

    let sendData = {
        matrix: matrix,
        voidCounter: (matrixSize.x * matrixSize.y) - (grassArr.length + eaterArr.length + predatorArr.length + omnivorousArr.length + planterArr.length + holeArr.length + eaterHelperArr.length + helperBombArr.length),
        grassCounter: grassArr.length,
        eaterCounter: eaterArr.length,
        predatorCounter: predatorArr.length,
        omnivorousCounter: omnivorousArr.length,
        planterCounter: planterArr.length,
        holeCounter: holeArr.length,
        eaterHelperCounter: eaterHelperArr.length,
        helperBombCounter: helperBombArr.length
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 100)

function spawnMob() {
    io.on("connection", (socket) => {
        socket.on("mobName", (data) => {
            if(data == "grass") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 1;
    
                let grass = new Grass(xRand,yRand);
                grassArr.push(grass);
            }
            else if(data == "eater") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 2;
    
                let eater = new GrassEater(xRand,yRand);
                eaterArr.push(eater);
            }
            else if(data == "predator") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 3;
    
                let predator = new Predator(xRand,yRand);
                predatorArr.push(predator);
            }
            else if(data == "planter") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 4;
    
                let planter = new GrassPlanter(xRand,yRand);
                planterArr.push(planter);
            }
            else if(data == "omnivorous") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 5;
    
                let omnivorous = new Omnivorous(xRand,yRand);
                omnivorousArr.push(omnivorous);
            }
            else if(data == "helper") {
                let
                xRand = Math.floor(Math.random() * matrix[0].length),
                yRand = Math.floor(Math.random() * matrix.length);
                
                matrix[yRand][xRand] = 6;
    
                let helper = new EaterHelper(xRand,yRand);
                eaterHelperArr.push(helper);
            }
        })
    })
}

spawnMob();

let int;

function clearMatrix() {
    io.on('connection',(socket) => {
        socket.on("clear",(data) => {
            if(data == "clean") {

                clearPlanters();

                matrix.length = null;
                grassArr.length = null;
                eaterArr.length = null;
                predatorArr.length = null;
                planterArr.length = null;
                holeArr.length = null;
                omnivorousArr.length = null;
                eaterHelperArr.length = null;
                helperBombArr.length = null;

                for(let i = 0;i < matrixSize.y;i++) {
                    matrix.push([])
                    for(let j = 0;j < matrixSize.x;j++) {
                        matrix[i].push(0)
                    }
                }

                setTimeout(function() { clearInterval(int); }, 1000)

                data = null;
            }
        })
    })
}

function clearPlanters() { 
    int = setInterval(
        function(){ 
            planterArr.length = null; for(let i = 0;i < matrixSize.y;i++) { for(let j = 0;j < matrixSize.x;j++) { if(matrix[i][j] == 4) matrix[i][j] = 0; }; };
        }
    )
}

clearMatrix();

let 
interval1,interval2;

function weatherChanging() {
    io.on("connection",(socket) => {
        socket.on("weather",(data) => {
            if(data === "spring") {
                clearInterval(interval2);
            }
            else if(data === "summer") {
                interval1 = setInterval(() => {
                    for(let i in grassArr) {
                        grassArr[i].grassChangeSpeed(3);
                    }
                })
            }
            else if(data === "autumn") {
                null
            }
            else if(data === "winter") {

                clearInterval(interval1);

                interval2 = setInterval(() => {
                    //GRASS-SLOWING
                    for(let i in grassArr) {
                        grassArr[i].grassChangeSpeed(7);
                    }
                    //EATER-SLOWING
                    for(let i in eaterArr) {
                        eaterArr[i].eaterSlowing(50);
                    }
                },100)

            }
        })
    })
}

weatherChanging();

io.sockets.emit("matrixData", matrix);
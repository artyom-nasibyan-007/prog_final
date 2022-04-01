var socket = io();

function setup() {

    var
    matrix = [];

    const block = 10;


    socket.on("data", drawCreatures);

    
    function drawCreatures(data) {
        matrix = data.matrix;
        createCanvas(matrix[0].length * block + 1,matrix.length * block + 1);
        background("gray");

        function changeCount(id,count) {
            document.getElementById(id).innerHTML = count;
        }

        changeCount("voidCount",data.voidCounter)
        changeCount("grassCount",data.grassCounter)
        changeCount("eaterCount",data.eaterCounter)
        changeCount("planterCount",data.planterCounter)
        changeCount("predatorCount",data.predatorCounter)
        changeCount("omnivorousCount",data.omnivorousCounter)
        changeCount("holeCount",data.holeCounter)
        changeCount("helperCount",data.eaterHelperCounter)
        changeCount("helperBombCount",data.helperBombCounter)

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
    }
    
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode == 71) { //G key in keyboard spawn grass in random position
        spawn("grass");
    }
    else if(e.keyCode == 69) { //E key in keyboard spawn grass in random position
        spawn("eater");
    }
    else if(e.keyCode == 80) { //P key in keyboard spawn grass in random position
        spawn("predator");
    }
    else if(e.keyCode == 70) { //F key in keyboard spawn grass in random position
        spawn("planter");
    }
    else if(e.keyCode == 79) { //O key in keyboard spawn grass in random position
        spawn("omnivorous");
    }
    else if(e.keyCode == 72) { //H key in keyboard spawn grass in random position
        spawn("helper");
    }
    else if(e.keyCode == 67) { //C key in keyboard spawn grass in random position
       clearMatrix();
    }  
})

function spawn(data) {
    socket.emit("mobName", data);
}

function clearMatrix() {
    socket.emit("clear", "clean");
}
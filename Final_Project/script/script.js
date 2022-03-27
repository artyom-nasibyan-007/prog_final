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

// function spawn(data) {
//     if(data == "grass") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "eater") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "predator") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "planter") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "omnivorous") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "hole") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "helper") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else if(data == "helperBomb") {
//         socket.on("connection",(server) => {
//             server.emit("mobName", data);
//         })
//     }
//     else {
//         console.log("ERROR: SUCH MOB DOES NOT EXIST");
//     }
// }
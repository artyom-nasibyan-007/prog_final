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

function openModalWindow(bgcolor,personname,personinfo) {

    let 
        infoWindow = document.querySelector(".information-modal-window"),
        personColorDiv = document.querySelector(".person-color-box"),
        personNameTag = document.querySelector(".person-name"),
        personInfoTag = document.querySelector(".person-info");

        infoWindow.style.visibility = "visible";
        infoWindow.style.opacity = "100%";

        personColorDiv.style.backgroundColor = bgcolor;
        personNameTag.innerHTML = personname;
        personInfoTag.innerHTML = personinfo;

}

document.getElementById("infoModalX").addEventListener('click',() => {
    let 
        infoWindow = document.querySelector(".information-modal-window");

    infoWindow.style.opacity = "0%";
    infoWindow.style.visibility = "hidden";
})

document.getElementById("keyboardModalX").addEventListener('click',() => {
    let 
        infoWindow = document.querySelector(".keyboard-spawning-modal-window");

    infoWindow.style.opacity = "0%";
    infoWindow.style.visibility = "hidden";
})

let elem = document.querySelector(".key");

elem.addEventListener('click',() => {
    elem.style.width = "calc(100% - 5px)";
    elem.style.height = "calc(100% - 5px)";
    elem.disabled = true;

    setTimeout(function(){     
        elem.style.width = "calc(100% - 10px)";
        elem.style.height = "calc(100% - 10px)"; 
        elem.disabled = false;
    },1000)
})

let modal2btn = document.getElementById("showEventKeyCodes");

modal2btn.addEventListener("click",() => {
    let elem = document.querySelector(".keyboard-spawning-modal-window");

    elem.style.visibility = "visible";
    elem.style.opacity = "100%";
})

let 
weatherCount = 1,
weather;

window.onload = function() {
    let weatherElem = document.getElementById("weather");

    if(weatherCount == 1) {
        weather = "Spring";
        weatherElem.innerHTML = weather;

        socket.emit("weather",weather);
    }
    else if(weatherCount == 2) {
        weather = "Summer";
        weatherElem.innerHTML = weather;

        socket.emit("weather",weather);
    }
    else if(weatherCount == 3) {
        weather = "Autumn";
        weatherElem.innerHTML = weather;

        socket.emit("weather",weather);
    }
    else if(weatherCount == 4) {
        weather = "Winter";
        weatherElem.innerHTML = weather;

        socket.emit("weather",weather);

        weatherCount = 1;
    }
}

document.getElementById("changeWeather").addEventListener('click',weatherChangeOnclick)

socket.on("matrixData", weatherChangeOnclick);

function weatherChangeOnclick(data) {
    var
    matrix = [];
    
    let 
    weatherElem = document.getElementById("weather");
        
    matrix = data;
    
    weatherCount++;
        
    console.log(matrix);

    if(weatherCount == 1) {
        weather = "Spring";
        weatherElem.innerHTML = weather;

        socket.emit("weather",weather);
    }
    else if(weatherCount == 2) {
        weather = "Summer";
        weatherElem.innerHTML = weather;
    
        for(let y = 0; y < matrix.length;y++) {
            for(let x = 0; x < matrix[y].length;x++) {
                if(matrix[y][x] == 1) {
                    fill("yellowgreen");
                }
                else if(matrix[y][x] == 2) {
                    fill("#acd106")
                }
                else if(matrix[y][x] == 3) {
                    fill("#260d54")
                }
                else if(matrix[y][x] == 4) {
                    fill("#662e0b");
                }
                else if(matrix[y][x] == 5) {
                    fill("#5b0b66");
                }
                else if(matrix[y][x] == 6) {
                    fill("#000000");
                }
                    else if(matrix[y][x] == 7) {
                    fill("#540202");
                }
                else if(matrix[y][x] == 8) {
                    fill("#754235");
                }
                else if(matrix[y][x] == 0) {
                    fill("gray")
                }
                noStroke();
                rect(x * block, y * block, block, block);
            }
        }
    
        socket.emit("weather",weather);
        }
        else if(weatherCount == 3) {
            weather = "Autumn";
            weatherElem.innerHTML = weather;
    
            socket.emit("weather",weather);
        }
        else if(weatherCount == 4) {
            weather = "Winter";
            weatherElem.innerHTML = weather;
    
            socket.emit("weather",weather);
    
            weatherCount = 0;
        }
}
var 
socket = io(),
weather = "spring";

const blockSize = 10;

function setup() {

    var
    matrix = [];

    socket.on("data", drawCreatures);

    
    function drawCreatures(data) {
        matrix = data.matrix;
        createCanvas(matrix[0].length * blockSize + 1,matrix.length * blockSize + 1);
        background("gray");

        function changeCount(id,count) {
            document.getElementById(id).innerHTML = count;
        }

        let int = setInterval(() => {
            if(data.eaterCounter == 0 && data.grassCounter != 0) {               
                let whoWin =  document.getElementById("whoWin");
                whoWin.innerHTML = "";
                whoWin.innerHTML = "Grass Wins";
                clearInterval(int);
                
                setTimeout(() => {
                    let int = setInterval(() => {
                        if(data.eaterCounter == 0 && data.grassCounter != 0) {               
                            let whoWin =  document.getElementById("whoWin");
                            whoWin.innerHTML = "";
                            whoWin.innerHTML = "Grass Wins";
                            clearInterval(int);
                        }
                        else if(data.eaterCounter != 0 && data.grassCounter == 0 && data.planterCounter == 0) {
                            let whoWin =  document.getElementById("whoWin");
                            whoWin.innerHTML = "";
                            whoWin.innerHTML = "Eaters Wins";
                            clearInterval(int);
                        }
                    },1)
                },1000)
            }
            else if(data.eaterCounter != 0 && data.grassCounter == 0 && data.planterCounter == 0) {
                let whoWin =  document.getElementById("whoWin");
                whoWin.innerHTML = "";
                whoWin.innerHTML = "Eaters Wins";
                clearInterval(int);

                setTimeout(() => {
                    let int = setInterval(() => {
                        if(data.eaterCounter == 0 && data.grassCounter != 0) {               
                            let whoWin =  document.getElementById("whoWin");
                            whoWin.innerHTML = "";
                            whoWin.innerHTML = "Grass Wins";
                            clearInterval(int);
                        }
                        else if(data.eaterCounter != 0 && data.grassCounter == 0 && data.planterCounter == 0) {
                            let whoWin =  document.getElementById("whoWin");
                            whoWin.innerHTML = "";
                            whoWin.innerHTML = "Eaters Wins";
                            clearInterval(int);
                        }
                    },1)
                },1000)
            }
        },1)

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

                // 1 - GRASS

                if (matrix[y][x] == 1) {

                    let clr;

                    if(weather == "spring") clr = "green";

                    else if(weather == "summer") clr = "#89E800";

                    else if(weather == "autumn") clr = "#B9DB04";

                    else if(weather == "winter") clr = "#00D199";                    

                    fill(clr)
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //2 - EATER

                if (matrix[y][x] == 2) {
                    
                    let clr;

                    if(weather == "spring") clr = "yellow";
                    
                    else if(weather == "summer") clr = "#FFCE00";
                    
                    else if(weather == "autumn") clr = "#8C7A00"; 
                    
                    else if(weather == "winter") clr = "#FDFF61";

                    fill(clr)
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //3 - PREDATOR

                if (matrix[y][x] == 3) {

                    fill("black");
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //4 - PLANTER

                if (matrix[y][x] == 4) {
                    let clr;

                    if(weather == "spring") clr = "red";

                    else if(weather == "summer") clr = "#FF5B2E";
             
                    else if(weather == "autumn") clr = "#701800";
                    
                    else if(weather == "winter") clr = "#6B2A18";

                    fill(clr);
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
                
                //5 - OMNIVOROUS

                if (matrix[y][x] == 5) {

                    fill("blue")
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //6 - HOLE

                if (matrix[y][x] == 6) {

                    fill("#333")
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //7 - EATER-HELPER

                if (matrix[y][x] == 7) {

                    let clr;

                    if(weather == "spring") clr = "#CD32BB";

                    else if(weather == "summer") clr = "#FF4AEA";

                    else if(weather == "autumn") clr = "#800071";

                    else if(weather == "winter") clr = "#4A0842";

                    fill(clr);
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                //8 - HELPER-BOMB

                if (matrix[y][x] == 8) {

                    fill("#024040");
                    rect(x * blockSize, y * blockSize, blockSize, blockSize);
                }

                noStroke();
            }
        }
    }
    
}

//-----------------------------------------------------------------------------

socket.on("matrix", changingColors);

function changingColors(matrix) { //Changing Weather Html Element Colors
    
    //CHANGING-PERSON-HTML-ELEMENT-COLORS

    let 
    grassHtmlElem = document.querySelector(".box.grass"),
    eaterHtmlElem = document.querySelector(".box.eater"),
    predatorHtmlElem = document.querySelector(".box.predator"),
    planterHtmlElem = document.querySelector(".box.planter"),
    omnivorousHtmlElem = document.querySelector(".box.omnivorous"),
    holeHtmlElem = document.querySelector(".box.hole"),
    helperHtmlElem = document.querySelector(".box.helper"),
    helperBombHtmlElem = document.querySelector(".box.helperBomb");

    setInterval(() => {
        for(let y = 0; y < matrix.length;y++) {
            for(let x = 0; x < matrix[y].length;x++) {

                // 1 - GRASS-ELEM

                if (matrix[y][x] == 1) {

                    let clr;

                    if(weather == "spring") clr = "green";

                    else if(weather == "summer") clr = "#89E800";

                    else if(weather == "autumn") clr = "#B9DB04";

                    else if(weather == "winter") clr = "#00D199";  

                    grassHtmlElem.style.backgroundColor = clr;
                }

                //2 - EATER-ELEM

                if (matrix[y][x] == 2) {
                    
                    let clr;

                    if(weather == "spring") clr = "yellow";
                
                    else if(weather == "summer") clr = "#FFCE00";
                    
                    else if(weather == "autumn") clr = "#8C7A00"; 
                    
                    else if(weather == "winter") clr = "#FDFF61";

                    eaterHtmlElem.style.backgroundColor = clr;
                }

                //3 - PREDATOR-ELEM

                if (matrix[y][x] == 3) {

                    predatorHtmlElem.style.backgroundColor = "black";
                }

                //4 - PLANTER-ELEM

                if (matrix[y][x] == 4) {
                    
                    let clr;

                    if(weather == "spring") clr = "red";

                    else if(weather == "summer") clr = "#FF5B2E";
             
                    else if(weather == "autumn") clr = "#701800";
                    
                    else if(weather == "winter") clr = "#6B2A18";

                    planterHtmlElem.style.backgroundColor = clr;
                }
                
                //5 - OMNIVOROUS-ELEM

                if (matrix[y][x] == 5) {

                    omnivorousHtmlElem.style.backgroundColor = "blue";
                }

                //6 - HOLE-ELEM

                if (matrix[y][x] == 6) {

                    holeHtmlElem.style.backgroundColor = "#333";
                }

                //7 - EATER-HELPER-ELEM

                if (matrix[y][x] == 7) {

                    let clr;

                    if(weather == "spring") clr = "#CD32BB";

                    else if(weather == "summer") clr = "#FF4AEA";

                    else if(weather == "autumn") clr = "#800071";

                    else if(weather == "winter") clr = "#4A0842";

                    helperHtmlElem.style.backgroundColor = clr;
                }

                //8 - HELPER-BOMB-ELEM

                if (matrix[y][x] == 8) {

                    helperBombHtmlElem.style.backgroundColor = "#024040";
                }
            }
        }
    },1)
}

changingColors();

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

let keyboardBtns = document.querySelectorAll(".key");

keyboardBtns.forEach((elem) => {
    elem.addEventListener('click',() => {
        elem.style.width = "calc(100% - 5px)";
        elem.style.height = "calc(100% - 5px)";
        elem.disabled = true;

        setTimeout(function(){     
            elem.style.width = "calc(100% - 10px)";
            elem.style.height = "calc(100% - 10px)"; 
            elem.disabled = false;
        },300)
    })
})

let modal2btn = document.getElementById("showEventKeyCodes");

modal2btn.addEventListener("click",() => {
    let elem = document.querySelector(".keyboard-spawning-modal-window");

    elem.style.visibility = "visible";
    elem.style.opacity = "100%";
})

let 
weatherCount = 1;

document.getElementById("changeWeather").addEventListener('click',weatherChangeOnclick)

socket.on("matrixData", weatherChangeOnclick);

function weatherChangeOnclick(data) {
    var
    matrix = [];
    
    let 
    weatherHtmlElem = document.getElementById("weather");
        
    matrix = data;
    
    weatherCount++;

        if(weatherCount == 1) {
            weather = "spring";
            socket.emit("weather",weather);
        }

        else if(weatherCount == 2) {
            weather = "summer";
            socket.emit("weather",weather);
        }

        else if(weatherCount == 3) {
            weather = "autumn";
            socket.emit("weather",weather);
        }

        else if(weatherCount == 4) {
            weather = "winter";
            socket.emit("weather",weather);
            weatherCount = 0;
        }
        else if(weatherCount > 4) {
            weatherCount = 1;
            weather = "spring";
            socket.emit("weather",weather);
        }

        weatherHtmlElem.innerHTML = weather.charAt(0).toUpperCase() + weather.slice(1);
}
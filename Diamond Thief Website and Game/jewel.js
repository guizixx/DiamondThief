"use strict"


var jewels = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];

var board = [];
var rows = 8;
var columns = 8;
var score = 0;

var currTile; //the jewel that its being clicked to drag.
var otherTile; //the jewel that we are trying to swap with.


window.onload = function() {
    startGame();

    // 1/10th of a second
    window.setInterval(function(){
        stealJewel();
        slideJewel();
        generateJewel();
    }, 100);
}


function randomJewel() {
    return jewels[Math.floor(Math.random() * jewels.length)]; //0 - 5.99 
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img id="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomJewel() + ".png";


            //Drag Functionality
            tile.addEventListener("dragstart", dragStart); //click on a jewel, inicia processo de drag
            tile.addEventListener("dragover", dragOver); //clicking on jewel, moving mouse to drag the jewel
            tile.addEventListener("dragenter", dragEnter); //draggin jewel onto another jewel
            tile.addEventListener("dragleave", dragLeave); //leave jewel over another jewel
            tile.addEventListener("drop", dragDrop); //dropping a jewel over another jewel
            tile.addEventListener("dragend", dragEnd); //after drag process completed, swap jewels
            

            document.getElementById("board").append(tile); //vai fazer append da linha do comentário acima no html.
            row.push(tile); //adiciona a image tag ao board array.
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    //this refers to tile that was clicked on for dragging
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //this refers to the target tile that was dropped on
    otherTile = this;
}

function dragEnd() {

    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); // id="0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function stealJewel() {
    stealFive()
    stealFour()
    stealThree();
    document.getElementById("score").innerText = score;

}

function stealThree() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                score += 1;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                score += 1;
            }
        }
    }
}

function stealFour() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            let jewel4 = board[r][c+3];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                jewel4.src = "./images/blank.png";
                score += 2;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            let jewel4 = board[r+3][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                jewel4.src = "./images/blank.png";
                score += 2;
            }
        }
    }
}

function stealFive() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            let jewel4 = board[r][c+3];
            let jewel5 = board[r][c+4];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && jewel4.src == jewel5.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                jewel4.src = "./images/blank.png";
                jewel5.src = "./images/blank.png";
                score += 3;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            let jewel4 = board[r+3][c];
            let jewel5 = board[r+4][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && jewel4.src == jewel5.src && !jewel1.src.includes("blank")) {
                jewel1.src = "./images/blank.png";
                jewel2.src = "./images/blank.png";
                jewel3.src = "./images/blank.png";
                jewel4.src = "./images/blank.png";
                jewel5.src = "./images/blank.png";
                score += 3;
            }
        }
    }
}

function checkValid() {
    // check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            let jewel4 = board[r][c+3];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            let jewel4 = board[r+3][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let jewel1 = board[r][c];
            let jewel2 = board[r][c+1];
            let jewel3 = board[r][c+2];
            let jewel4 = board[r][c+3];
            let jewel5 = board[r][c+4];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && jewel4.src == jewel5.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }
    // check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) { //dentro da coluna, vamos verificar dois a frente da joia atual
            let jewel1 = board[r][c];
            let jewel2 = board[r+1][c];
            let jewel3 = board[r+2][c];
            let jewel4 = board[r+3][c];
            let jewel5 = board[r+4][c];
            //check if img src are the same, and if so 'steal' the jewels.
            if (jewel1.src == jewel2.src && jewel2.src == jewel3.src && jewel3.src == jewel4.src && jewel4.src == jewel5.src && !jewel1.src.includes("blank")) {
                return true;
            }
        }
    }
    
    return false
}

function slideJewel() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1; //começa no fundo de cada coluna
        for (let r = columns-1; r >= 0; r--) { //o menos significa a ir para cima
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src; //set the image of the current blank tile to the jewel
                ind -= 1 //move the blank tile up by one
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png"
        }
    }
}

function generateJewel() {
    //só precisamos de gerar joias para a primeira linha porque a função slideJewel desliza as joias para baixo
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomJewel() + ".png";
        }
    }
}
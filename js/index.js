// const: Colors for background / border
// colors for snake and snake-border
const canvasBorderColor = 'black';
const canvasBackgroundColor  = "lightblue";
const snakeColor = "lightgreen";
const snakeBorderColor = "darkgreen";


// x && y coordinates for snake
// each "square" has it's down x && y axis
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150}
]


// get the canvas element
let gameCanvas = document.getElementById("snake-board");
// get the ctx 
let ctx = gameCanvas.getContext("2d");

function drawBackground(){
// set / draw canvas background color
ctx.fillStyle = canvasBackgroundColor;
ctx.fillRect(0, 0, 1000, 500);
//set / draw canvas border color
ctx.strokestyle = canvasBorderColor;
ctx.strokeRect(0, 0, 1000, 500);
}

// loops through each snakePart and calls drawSnakePart
function drawSnake() {
  snake.forEach(drawSnakePart)
}


function drawSnakePart(snakePart){
  //  set color / draw snakePart
  ctx.fillStyle = snakeColor;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  //  set border / draw border for snakePart
  ctx.strokestyle = snakeBorderColor;
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);

}

function updateCanvas(){
  ctx.clearRect(0, 0, 1000, 500);
  drawBackground();
  drawSnake();
}



document.onkeydown = function(event) {

  let head;

  switch (event.keyCode) {
    case 38:  //38:upArrow 87:W
    case 87: 
    head = {x: snake[0].x, y: snake[0].y -10};
      break; 
    case 40:  //40:downArrow 83:S
    case 83: 
    head = {x: snake[0].x, y: snake[0].y + 10};
      break; 
    case 37:  //37:leftArrow: 65:A
    case 65: 
    head = {x: snake[0].x - 10, y: snake[0].y};
      break; 
    case 39:  //39:rightArrow 68:D
    case 68: 
    head = {x: snake[0].x + 10, y: snake[0].y};        
      break; 
  }
  // updates canvas on every move
  advance(head)
  updateCanvas();
}

function advance(head){
  snake.unshift(head);
  snake.pop();
}


  updateCanvas();
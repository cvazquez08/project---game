// const: Colors for background / border
// colors for snake and snake-border
const canvasBorderColor = 'black';
const canvasBackgroundColor  = "black";
const snakeColor = "#20FF00";
const snakeBorderColor = "#20FF00";
// target width and height and set to variable for easy targeting
const width = document.getElementById("snake-board").width;
const height = document.getElementById("snake-board").height;

// get the canvas element
let gameCanvas = document.getElementById("snake-board");
// get the ctx 
let ctx = gameCanvas.getContext("2d");

const cellWidth = 10;
let direction;
let score;
let snakeArray;


// the game function which calls snake / food function in a loop with set interval
function play(){
  direction = "right" // setting default direction for constant moving
  snake();
  food();

  score = 0;

  if (typeof game_loop != "undefined") clearInterval(game_loop);
  game_loop = setInterval(paint, 60);

  
}

play();

// snake function assigns all objects into array
function snake(){
  let length = 5; // starting with 5 blocks
  snakeArray = []; // starts with empty array
  //loop through array and create 5 objects with x and y axis
  for(let i = length - 1; i >= 0; i--){
    snakeArray.push({x: i, y: 0});
  }

}

function food(){
  food = {
    // randomize an X and Y axis between the board
    x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
    y: Math.round(Math.random() * (height - cellWidth) / cellWidth)

  };
}

function paint(){
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = canvasBorderColor;
  ctx.strokeRect(0, 0, width, height);

  // this loops through snake() 2d array and paints each block
  for (var i = 0; i < snakeArray.length; i++) {
    var cell = snakeArray[i];
    paintCell(cell.x, cell.y);
  }

  // create movement *pop tail and unshift to head

  // target head x and y axis with variable
  let headX = snakeArray[0].x;
  let headY = snakeArray[0].y;

  // add movement
  if (direction == "right") headX++;
  else if(direction == "left") headX--;
  else if(direction == "up") headY--;
  else if(direction == "down") headY++;

// assigns last object in array to tail variable
  let tail = snakeArray.pop();
  tail.x = headX; // reasigns new tail to headX 
  tail.y = headY; // headY => so snake can keep moving
  snakeArray.unshift(tail); //unshifts tail to front of array and keeps looping
  // paint loops every 60ms from the play();

  // paint food = > already have it with random coordinates
  paintCell(food.x, food.y);

  // add score
  let scoreText = "Score: " + score;
  ctx.fillText(scoreText, 20, 410, 50, 50);

}

// generic function for painting snake && food
function paintCell(x, y) {
  ctx.fillStyle = snakeColor;
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  ctx.strokeStyle = snakeBorderColor
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

// event listner when key is pressed
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 38:  //38:upArrow 87:W
    case 87: 
    direction = "up";
      break; 

    case 40:  //40:downArrow 83:S
    case 83: 
    direction = "down";
      break; 

    case 37:  //37:leftArrow: 65:A
    case 65: 
    direction = "left";
      break; 

    case 39:  //39:rightArrow 68:D
    case 68: 
    direction = "right";     
      break; 
  }
}



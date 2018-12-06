// const: Colors for background / border
// colors for snake and snake-border
const canvasBorderColor = 'black';
const canvasBackgroundColor  = "black";
const snakeColor = "#20FF00";
const snakeBorderColor = "black";
const foodColor = "red";
const foodBorderColor = "black";
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
let game_loop;

// the game function which calls snake / food function in a loop with set interval
function play(){
  direction = "right" // setting default direction for constant moving
  snake();
  randomFood();

  score = 0;

  if (typeof game_loop != "undefined") clearInterval(game_loop);
  // maybe useless line = > can use to stop game.
  game_loop = setInterval(paint, 50);

  
}

// on click for play button
const playBtn = document.getElementsByClassName("start-game")[0];

playBtn.onclick = function(){
  play();
}

// snake function assigns all objects into array
function snake(){
  let length = 5; // starting with 5 blocks
  snakeArray = []; // starts with empty array
  //loop through array and create 5 objects with x and y axis
  for(let i = length - 1; i >= 0; i--){
    snakeArray.push({x: i, y: 0});
  }

}

function randomFood(){
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
  if (direction === "right") headX++;
  else if(direction === "left") headX--;
  else if(direction === "up") headY--;
  else if(direction === "down") headY++;

  if(headX == food.x && headY == food.y){

    let tail = {x: headX, y: headY};
    snakeArray.unshift(tail);
    score++;
    randomFood();
  }else {
  
    // if not assign last object in array to tail variable
  let tail = snakeArray.pop();
  tail.x = headX; // reasigns new tail to headX 
  tail.y = headY; // headY => so snake can keep moving
  snakeArray.unshift(tail); //unshifts tail to front of array and keeps looping
  // paint loops every 60ms from the play();

  }

  

  // paint food = > already have it with random coordinates
  paintFood(food.x, food.y);

  // add score
  let scoreText = "Score: " + score;
  ctx.font = "20px VT323";
  ctx.fillStyle = snakeColor;
  ctx.fillText(scoreText, 20, 490);

}

// generic function for painting snake && food
function paintCell(x, y) {
  ctx.fillStyle = snakeColor;
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  ctx.strokeStyle = snakeBorderColor;
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

function paintFood(x, y){
  ctx.fillStyle = foodColor;
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  ctx.strokeStyle = foodBorderColor;  
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);  

}
// event listner when key is pressed
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 38:  //38:upArrow 87:W
    case 87: 
    if(direction != "down"){
    direction = "up";
    }
      break; 

    case 40:  //40:downArrow 83:S
    case 83: 
    if(direction != "up"){
    direction = "down";
    }
      break; 

    case 37:  //37:leftArrow: 65:A
    case 65: 
    if(direction != "right"){
    direction = "left";
    }
      break; 

    case 39:  //39:rightArrow 68:D
    case 68: 
    if(direction != "left"){
    direction = "right";    
    } 
      break; 
  }

  console.log(event.keyCode);
}



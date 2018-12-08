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
let intervalTime;
let isOver = false;



// the game function which calls snake / food function in a loop with set interval
function play(){
  direction = "right" // setting default direction for constant moving
  snake();  // call snake function which creates array
  randomFood(); // call randomFood function which randomizes position of food

  score = 0; // default score 0

 
     // setInterval for paint - which clears and redraws game to animate movement
  if (typeof game_loop != "undefined") clearInterval(game_loop);
  game_loop = setInterval(paint, 100);

  }



// on click for play button
const playBtn = document.getElementsByClassName("start-game")[0];
playBtn.onclick = function(){
  play();
  isOver = false;
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

// function which randomized position of food
function randomFood(){
  food = {
    x: Math.round(Math.random() * (width - cellWidth) / cellWidth), // randomize x axis
    y: Math.round(Math.random() * (height - cellWidth) / cellWidth) // randomize y axis

  };
}

// main game function = > controls canvas, background, snake, food and collision
function paint(){
  // canvas and background
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = canvasBorderColor;
  ctx.strokeRect(0, 0, width, height);

  // this loops through snake() 2d array and paints each block
  for (var i = 0; i < snakeArray.length; i++) {
    var cell = snakeArray[i];
    paintCell(cell.x, cell.y);
  }


  // target head x and y axis with variable
  let headX = snakeArray[0].x;
  let headY = snakeArray[0].y;

  // add movement
  if(!isOver){
  if (direction === "right") headX++;
  else if(direction === "left") headX--;
  else if(direction === "up") headY--;
  else if(direction === "down") headY++;

  }

  // check collision for bounders and call checkCollision function
  // for collision with itself
  if(headX < -1 || headX > (width / cellWidth) || headY < -1 || headY > (height / cellWidth) || checkCollision(headX, headY, snakeArray)){
    gameOver();
  }else{

  // if snakeHead touches food - add food to snakebody
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

// function for drawing food - split function for different color food
function paintFood(x, y){
  ctx.fillStyle = foodColor;
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
  ctx.strokeStyle = foodBorderColor;  
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);  

}

// function to check collision
function checkCollision(x, y, array){
  // loop through snake array and see if any x&y coordinates
  // are touching another x&y coordinate of body
  for(let i = 0; i < array.length; i++){
    if(array[i].x === x && array[i].y === y) 
    return true;
  }
    return false;
}

function gameOver(){
  ctx.clearRect(0, 0, width, height);
  
  isOver = true;
  
  const gameOverImg = new Image();
  gameOverImg.src = "images/game-over.png";

  gameOverImg.onload = function(){
    ctx.drawImage(gameOverImg, 0, 0, width, height); 

  }

}

// event listner when key is pressed
document.onkeydown = function(event) {

  switch (event.keyCode) {
    case 38:  //38:upArrow 87:W
    case 87: 
    if(direction != "down"){
      setTimeout(function(){

        direction = "up";
      }, 75)
    }
      break; 

    case 40:  //40:downArrow 83:S
    case 83: 
    if(direction != "up"){
      setTimeout(function(){

        direction = "down";
      }, 75)
    }
      break; 

    case 37:  //37:leftArrow: 65:A
    case 65: 
    if(direction != "right"){
      setTimeout(function(){

        direction = "left";
      }, 75)    }
      break; 

    case 39:  //39:rightArrow 68:D
    case 68: 
    if(direction != "left"){

      setTimeout(function(){

        direction = "right";
      }, 75)    
    } 
      break; 
  }

 
}



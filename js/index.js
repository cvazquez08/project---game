//  target <canvas> by ID "snake-board"
const myCanvas = document.getElementById("snake-board");
const ctx = myCanvas.getContext("2d");

//  snake object
//  with x and y starting points 
//  snake size
//  && moving functions
let snake = {
  x: 500,
  y: 250,
  width: 25,
  height: 25,
  moveUp:    function() { this.y -= 10 },
  moveDown:  function() { this.y += 10 },
  moveLeft:  function() { this.x -= 10 },
  moveRight: function() { this.x += 10 },
}

 // function that draws snake
function draw(snake){
  ctx.fillRect(snake.x, snake.y, snake.width, snake.height);
}

// apple object
//  x and y starting points
//  width and height set
let apple = {
  x: 300,
  y: 50,
  width: 10,
  height: 10,
 
}

// function that draws apple
function draw(apple){
  ctx.fillRect(apple.x, apple.y, apple.width, apple.height);
}

function updateCanvas(){
  ctx.clearRect(0, 0, 1000, 500);
  draw(snake);
  draw(apple);
 
}

// switch for movement keys
document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 38:  //38:upArrow 87:W
    case 87: 
      snake.moveUp();  
      break; 
    case 40:  //40:downArrow 83:S
    case 83: 
      snake.moveDown(); 
      break; 
    case 37:  //37:leftArrow: 65:A
    case 65: 
      snake.moveLeft(); 
      break; 
    case 39:  //39:rightArrow 68:D
    case 68: 
      snake.moveRight();
      break; 
  }
 // updates canvas on every move
  updateCanvas();
}

function collision(){
  
}

// intial update with intial values
updateCanvas();


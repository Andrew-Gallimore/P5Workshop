// Mouse variables
const moveAmount = 3;
var lastDirection = "w";
var mousyX = 200;
var mousyY = 200;

// Mold variables
var molds = [];
var moldDelay = 500; // In milliseconds
var counter = 0;


function setup() {
  angleMode(DEGREES);
  createCanvas(400, 400);
  
  const numMolds = random(10, 30);
  for(i = 0; i < numMolds; i++) {
    makeMold(true);
  }
}


function draw() {
  background(220, 200, 0);
  // Check if we need to add a mold
  if(counter >= moldDelay) {
    makeMold();
    counter = 0;
  }
  
  // Check if mouse is over mold
  for(i = 0; i < molds.length; i++) {
    if(abs(mousyX - molds[i].x) < 30 && abs(mousyY - molds[i].y) < 30) {
      molds.splice(i, 1);
    }
  }
  drawMolds();
  
  moveMouse();
  drawMouse();
  
  drawTextStuff();
  
  counter += deltaTime;
}



// ==== MOLD ====
function makeMold(fullRandom=false) {
  var x;
  var y;
  
  if(fullRandom || molds.length === 0 || random(0, 100) > 95) {
    // Full Random
    x = random(0, 400);
    y = random(0, 400);
  }else {
    // Spreading
    x = random(-70, 70);
    y = random(-70, 70);

    var index = floor(random(0, molds.length));
    x += molds[index].x;
    y += molds[index].y;

    if(x < 0) x = 0;
    if(x > 400) x = 400;
    if(y < 0) y = 0;
    if(y > 400) y = 0;
  }
  
  molds.push({x, y});
}
function drawMolds() {
  for(i = 0; i < molds.length; i++) {
    fill(120, 160, 50);
    stroke(0,0,0,0);
    circle(molds[i].x, molds[i].y, 20);
  }
}



// ==== MOUSE ====
function moveMouse() {
  if(keyIsPressed) {
    // Depends on key pressed
    switch(key) {
      case "a":
      case "ArrowLeft":
        // Move left
        mousyX -= moveAmount;
        lastDirection = "a";
        break;
        
      case "d":
      case "ArrowRight":
        // Move right
        mousyX += moveAmount;
        lastDirection = "d";
        break;
        
      case "w":
      case "ArrowUp":
        // Move up
        mousyY -= moveAmount;
        lastDirection = "w";
        break;
        
      case "s":
      case "ArrowDown":
        // Move down
        mousyY += moveAmount;
        lastDirection = "s";
        break;
    }
  }
}
function drawMouse() {
  push();
    translate(mousyX, mousyY);
  
    var angle = 0;
    if(lastDirection === "w") {
      angle = 0;
    }else if(lastDirection === "s") {
      angle = 180;
    }else if(lastDirection === "a") {
      angle = -90;
    }else if(lastDirection === "d") {
      angle = 90;
    }
    rotate(angle);
  
    // triangle(x_1, y_1, x_2, y_2, x_3, y_3)
    fill(180, 120, 0);
    stroke(110, 80, 0);
    triangle(-10, 12, 10, 12, 0, -12);
  pop();
}


// ==== TEXT STUFF ====
function drawTextStuff() {
  fill(0,0,0);
  textSize(40);
  text("Mousy!", 130, 40);
}
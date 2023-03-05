// define variables
let planetImg;
let moon1Img;
let moon2Img;
let ship1Img;
let ship2Img;
let explosionColor;
let rainbowColor;
let timeToExplode;
let messageColor;
let mySound;

function preload() {
  mySound = loadSound('my-audio-file.mp3');
}

// set initial state
let gameState = 'playing';

// set up the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  timeToExplode = 500; // 3 seconds
  messageColor = color(255);
  
  // load images
  planetImg = loadImage("earth.png");
  moon1Img = loadImage("moon.png");
  moon2Img = loadImage("moon2.png");
  ship1Img = loadImage("spaceship.png");
  ship2Img = loadImage("alien.png");
}

function draw() {
  if (gameState === 'playing') {
    background(0);
    // draw planet
    image(planetImg, width/2 - planetImg.width/2, height/2 - planetImg.height/2);
    // draw moons
    image(moon1Img, width/2 + 100*cos(frameCount/100) - moon1Img.width/2, height/2 + 100*sin(frameCount/100) - moon1Img.height/2);
    image(moon2Img, width/2 + 200*cos(frameCount/200) - moon2Img.width/2, height/2 + 200*sin(frameCount/200) - moon2Img.height/2);
    // draw spaceships
    image(ship1Img, mouseX - ship1Img.width/2, mouseY - ship1Img.height/2);
    if (frameCount > timeToExplode/2) {
      image(ship2Img, width - 100*(frameCount/100) - ship2Img.width/2, height/2 - ship2Img.height/2);
    }
  } else if (gameState === 'exploding') {
    // play explosion sound
    mySound.play();
    
    // create fire color explosion effect
    background(255, 0, 0);
    for (let i = 0; i < 100; i++) {
      explosionColor = color(random(255), random(255), 0);
      fill(explosionColor);
      ellipse(random(width), random(height), random(10, 200), random(10, 200));
    }
    
    // transition to rainbow
    if (frameCount > 150) {
      rainbowColor = color(random(255), random(255), random(255));
      fill(rainbowColor);
      rect(0, 0, width, height);
      gameState = 'done';
    }
  } else if (gameState === 'done') {
    // print message
    textSize(80);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    messageColor = color(random(255), random(255), random(255));
    fill(messageColor);
    text("Life is weird", width/2, height/2);
  }
}

// handle mouse clicks
function mouseClicked() {
  if (gameState === 'playing') {
    gameState = 'exploding';
    mySound.play();
  }
}

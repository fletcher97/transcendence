const canvas = document.getElementById("local-pong-canvas");
const ctx = canvas.getContext("2d");
const blue = "rgb(0, 132, 255)";
const pink = "#db3593";
// const mainColour = "rgb(0, 132, 255)";
const mainColour = blue;

const paddleWidth = 10,
  paddleHeight = 60;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 12;

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 7;
let ballSpeedY = 7;

let player1Score = 0;
let player2Score = 0;

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = mainColour;
  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  // Draw ball
  ctx.fillStyle = mainColour;
  ctx.shadowColor = mainColour;
  ctx.shadowBlur = 40;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Draw scores
  ctx.fillStyle = mainColour;
  ctx.fillText("Player 1: " + player1Score, 100, 50);
  ctx.font = "bold 48px Orbitron";
  ctx.fillText("Player 2: " + player2Score, canvas.width - 400, 50);
}

function update() {
  // Move paddles
  if (upPressed && paddle2Y > 0) {
    paddle2Y -= paddleSpeed;
  }
  if (downPressed && paddle2Y + paddleHeight < canvas.height) {
    paddle2Y += paddleSpeed;
  }

  if (wPressed && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (sPressed && paddle1Y + paddleHeight < canvas.height) {
    paddle1Y += paddleSpeed;
  }

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with paddles
  if (
    (ballX - ballSize < paddleWidth &&
      ballY > paddle1Y &&
      ballY < paddle1Y + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
      ballY > paddle2Y &&
      ballY < paddle2Y + paddleHeight)
  ) {
    // Calculate the reflection angle
    let deltaY;
    if (ballY < paddle1Y + paddleHeight / 3) {
      deltaY = -1;
    } else if (ballY > paddle1Y + (2 * paddleHeight) / 3) {
      deltaY = 1;
    } else {
      deltaY = 0;
    }

    ballSpeedX = -ballSpeedX;
    ballSpeedY = deltaY * 5;
  }

  // Ball collision with top and bottom walls
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball out of bounds (score)
  if (ballX - ballSize < 0) {
    player2Score++;
    resetBall();
  }
  if (ballX + ballSize > canvas.width) {
    player1Score++;
    resetBall();
  }
}

function resetBall() {
  console.log("ballSpeedX: ", ballSpeedX);
  ballX = ballSpeedX > 0 ? canvas.width / 1.5 : canvas.width / 4;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX; // Start the ball in the opposite direction
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Handle keyboard input
let upPressed = false;
let downPressed = false;

let wPressed = false;
let sPressed = false;

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  }

  if (event.key === "w") {
    wPressed = true;
  } else if (event.key === "s") {
    sPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  }

  if (event.key === "w") {
    wPressed = false;
  } else if (event.key === "s") {
    sPressed = false;
  }
});

// Start the game loop
gameLoop();

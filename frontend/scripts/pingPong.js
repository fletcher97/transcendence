const canvas = document.getElementById("pingPongCanvas");
const ctx = canvas.getContext("2d");

// Paddle
const paddleWidth = 10,
  paddleHeight = 60;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let botPaddleY = (canvas.height - paddleHeight) / 2;

// Ball
const ballSize = 10;
let ballX = canvas.width / 2,
  ballY = canvas.height / 2;
let ballSpeedX = 5,
  ballSpeedY = 5;

// Paddle controls
const paddleSpeed = 10;
let upPressed = false,
  downPressed = false;

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player's paddle
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

  // Draw the bot's paddle
  ctx.fillRect(
    canvas.width - paddleWidth,
    botPaddleY,
    paddleWidth,
    paddleHeight
  );

  // Draw the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();

  // Move the player's paddle
  if (upPressed && playerPaddleY > 0) {
    playerPaddleY -= paddleSpeed;
  }
  if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
    playerPaddleY += paddleSpeed;
  }

  // Move the bot's paddle (simple bot logic)
  const botCenter = botPaddleY + paddleHeight / 2;
  if (botCenter < ballY - 5) {
    botPaddleY += paddleSpeed;
  } else if (botCenter > ballY + 5) {
    botPaddleY -= paddleSpeed;
  }

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collisions with walls
  if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collisions with paddles
  if (
    (ballX - ballSize < paddleWidth &&
      ballY + ballSize > playerPaddleY &&
      ballY - ballSize < playerPaddleY + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
      ballY + ballSize > botPaddleY &&
      ballY - ballSize < botPaddleY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball goes out of bounds (reset position)
  if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  }

  requestAnimationFrame(draw);
}

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

draw(); // Start the game loop

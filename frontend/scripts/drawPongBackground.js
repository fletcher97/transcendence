import { accentColor, primaryColor } from "../assets/colors.js";

const canvas = document.getElementById("pong-background");
const ctx = canvas.getContext("2d");

// Paddle
const paddleWidth = 10,
  paddleHeight = 50;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let firstBotPaddleY = (canvas.height - paddleHeight) / 2;
let secondBotPaddleY = (canvas.height - paddleHeight) / 2;

// Ball
const ballSize = 3;
let ballX = canvas.width / 2,
  ballY = canvas.height / 2;
let ballSpeedX = 1.5,
  ballSpeedY = 1.5;

// Paddle controls

export function drawPongBackground() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawPongBackground the player's paddle

  // drawPongBackground the bot's paddle
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, firstBotPaddleY, paddleWidth, paddleHeight);
  ctx.fillRect(
    canvas.width - paddleWidth,
    secondBotPaddleY,
    paddleWidth,
    paddleHeight
  );

  // drawPongBackground the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = primaryColor;
  ctx.fill();
  ctx.closePath();

  // Move the bot's paddle (simple bot logic)
  const botCenter = firstBotPaddleY + paddleHeight / 2;
  console.log(ballSpeedX);
  if (botCenter < ballY - 5) {
    firstBotPaddleY += 1.5;
    secondBotPaddleY -= 1.5;
  } else if (botCenter > ballY + 5) {
    firstBotPaddleY -= 1.5;
    secondBotPaddleY += 1.5;
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
      ballY + ballSize > secondBotPaddleY &&
      ballY - ballSize < secondBotPaddleY + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth &&
      ballY + ballSize > firstBotPaddleY &&
      ballY - ballSize < firstBotPaddleY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball goes out of bounds (reset position)
  // if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
  //   ballX = canvas.width / 2;
  //   ballY = canvas.height / 2;
  // }
  let rqf = requestAnimationFrame(drawPongBackground);
  if (!document.getElementById("pong-background")) cancelAnimationFrame(rqf);
}

// drawPongBackground(); // Start the game loop

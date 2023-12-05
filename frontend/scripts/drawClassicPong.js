function drawClassicPong() {
  console.log("runnign draw classic pong");
  const canvas = document.querySelector("#classic-pong-canvas");
  const ctx = canvas.getContext("2d");
  if (canvas) {
    // Rest of your drawing logic here
  } else {
    console.error("Canvas element not found!");
  }
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
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // drawClassicPong the player's paddle
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

  // drawClassicPong the bot's paddle
  ctx.fillRect(
    canvas.width - paddleWidth,
    botPaddleY,
    paddleWidth,
    paddleHeight
  );

  // drawClassicPong the ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();

  // // Move the player's paddle
  // if (upPressed && playerPaddleY > 0) {
  //   playerPaddleY -= paddleSpeed;
  // }
  // if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
  //   playerPaddleY += paddleSpeed;
  // }

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

  requestAnimationFrame(drawClassicPong);
}

// document.addEventListener("keydown", keyDownHandler);
// document.addEventListener("keyup", keyUpHandler);

// drawClassicPong(); // Start the game loop

export default drawClassicPong;

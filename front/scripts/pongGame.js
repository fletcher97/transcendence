export const playPong = () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Game variables
  const paddleWidth = 10;
  const paddleHeight = 80;
  const ballSize = 10;

  let player1Y = canvas.height / 2 - paddleHeight / 2;
  let player2Y = canvas.height / 2 - paddleHeight / 2;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  let ballSpeedX = 5;
  let ballSpeedY = 2;

  // Function to draw paddles
  function drawPaddle(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  }

  // Function to draw the ball
  function drawBall(x, y) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Function to update the game state
  function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce off the top and bottom walls
    if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Bounce off the paddles
    if (
      (ballX - ballSize < paddleWidth &&
        ballY > player1Y &&
        ballY < player1Y + paddleHeight) ||
      (ballX + ballSize > canvas.width - paddleWidth &&
        ballY > player2Y &&
        ballY < player2Y + paddleHeight)
    ) {
      ballSpeedX = -ballSpeedX;
    }

    // Handle player input
    document.addEventListener("keydown", function (event) {
      // Player 1 controls (W and S keys)
      if (event.key === "w" && player1Y > 0) {
        player1Y -= 10;
      } else if (event.key === "s" && player1Y < canvas.height - paddleHeight) {
        player1Y += 10;
      }

      // Player 2 controls (Up and Down arrow keys)
      if (event.key === "ArrowUp" && player2Y > 0) {
        player2Y -= 10;
      } else if (
        event.key === "ArrowDown" &&
        player2Y < canvas.height - paddleHeight
      ) {
        player2Y += 10;
      }
    });
  }

  // Function to render the game
  function render() {
    // Clear the canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);

    // Draw the ball
    drawBall(ballX, ballY);
  }

  // Main game loop
  function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
};

// Start the game loop

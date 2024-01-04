export const drawPong = (gameState, canvas, ctx) => {
  console.log("gameState in drawPong: ", gameState);

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

  function drawBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Function to render the game
  function render() {
    // logic to only draw once?
    drawBackground();

    // Draw paddles
    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);

    // Draw the ball
    drawBall(ballX, ballY);
  }

  // Game variables
  const paddleWidth = 10;
  const paddleHeight = gameState.players.p1.paddle_height;
  const ballSize = 10;

  let player1Y = canvas.height / 2 - paddleHeight / 2;
  let player2Y = canvas.height / 2 - paddleHeight / 2;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;
  render();

  // Main game loop
};

// Start the game loop

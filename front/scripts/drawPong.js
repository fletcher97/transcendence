import { primaryColor, accentColor } from "../../../assets/colors.js";

export const drawPong = (gameState, canvas, ctx) => {
  console.log("gameState in drawPong: ", gameState);

  // Game variables
  const paddleWidth = 10;
  const paddleHeight = gameState.players.p1.paddle_height;
  const ballSize = 10;
  console.log("canvas: ", canvas.width);

  let player1Y = gameState.players.p1.position - paddleHeight / 2;
  let player2Y = gameState.players.p2.position - paddleHeight / 2;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;

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
    ctx.fillStyle = "#344C65";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Function to render the game
  function render() {
    // logic to only draw once?
    drawBackground();

    // Draw paddles
    drawPaddle(0, player1Y);
    drawPaddle(canvas.width - paddleWidth, player2Y);
    ctx.font = "10px Arial";
    ctx.fillStyle = "pink";

    // Draw text on the canvas
    ctx.fillText("score: 1", 30, 20);

    // Draw the ball
    drawBall(ballX, ballY);
  }

  render();

  // Main game loop
};

// Start the game loop

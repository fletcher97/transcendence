import { primaryColor, accentColor } from "../../../assets/colors.js";

export const drawPong = (gameState, canvas, ctx) => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  // Game variables
  const paddleWidth = 10;
  const paddleHeight = gameState.players.p1.paddle_height;
  const ballSize = 10;

  let player1Y = gameState.players.p1.position - paddleHeight / 2;
  let player2Y = gameState.players.p2.position - paddleHeight / 2;
  let ballX = canvas.width / 2;
  let ballY = canvas.height / 2;

  // Function to draw paddles
  function drawPaddle(x, y) {
    ctx.fillStyle = "#d73993";
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
  }

  // Function to draw the ball
  function drawBall(x, y) {
    ctx.fillStyle = "#d73993";
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBackground() {
    ctx.fillStyle = "#1f2d3d";
    ctx.fillStyle = "#2C4257";
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

  render();
};

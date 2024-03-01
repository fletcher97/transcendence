const canvas = document.getElementById("local-pong-canvas");
const ctx = canvas.getContext("2d");
const blue = "rgb(0, 132, 255)";
const pink = "#db3593";
const mainColour = blue;

const paddleWidth = 10,
  paddleHeight = 80;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 12;
createReplayButton();

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 0;
let ballSpeedY = 0;

let player1Score = 0;
let player2Score = 0;

let gameState = "paused"; // "paused" or "playing"

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
  ctx.fillStyle = pink;
  ctx.shadowColor = pink;
  ctx.fillText("Player 1: " + player1Score, 100, 50);
  ctx.font = "bold 28px Orbitron";
  ctx.fillText("Player 2: " + player2Score, canvas.width - 250, 50);

  // Draw dashed line in the middle
  ctx.shadowColor = mainColour;
  ctx.setLineDash([35, 15]); // Set the dash pattern (5 pixels on, 15 pixels off)
  ctx.strokeStyle = mainColour;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.closePath();
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

  // Move the ball only if the game is in the "playing" state
  if (gameState === "playing") {
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
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 0;
  ballSpeedY = 0;
  gameState = "paused"; // Pause the game when the ball is reset
}

function startGame() {
  ballSpeedX = 7; // Set initial ball speed
  ballSpeedY = 7;
  gameState = "playing"; // Start the game
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

  // Start the game when 'Space' key is pressed
  if (event.key === " " && gameState === "paused") {
    startGame();
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

function createReplayButton() {
  const replayButton = document.createElement("button");
  replayButton.textContent = "REPLAY";
  replayButton.style.position = "absolute";
  replayButton.style.top = "50%";
  replayButton.style.left = "50%";
  replayButton.style.transform = "translate(-50%, -50%)";
  replayButton.style.padding = "10px";
  replayButton.style.fontSize = "16px";
  replayButton.style.cursor = "pointer";
  // replayButton.addEventListener("click", handleReplayClick);
  document.body.appendChild(replayButton);
}

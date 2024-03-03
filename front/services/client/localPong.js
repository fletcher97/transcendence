import { switchRoute } from "../../index.js";

const canvas = document.getElementById("local-pong-canvas");
console.log("inside localPong.js");
const ctx = canvas.getContext("2d");
const blue = "rgb(0, 132, 255)";
const pink = "#db3593";
const mainColour = blue;

const paddleWidth = 10,
  paddleHeight = 80;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 12;
const localPongContainer = document.getElementById("local-pong-container");
createReplayButton();
const returnButton = createReturnButton();

const ballSize = 15;
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

  // Draw ball as square
  ctx.fillStyle = mainColour;
  ctx.shadowColor = mainColour;
  ctx.shadowBlur = 40;
  ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
  ctx.shadowBlur = 0; // Reset shadow

  // Draw scores
  ctx.fillStyle = mainColour;
  ctx.shadowColor = mainColour;
  ctx.font = "bold 68px Orbitron";
  ctx.fillText(player1Score, 240, 70);
  ctx.fillText(player2Score, 410, 70);

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

    if (player1Score === 5 || player2Score === 5) {
      endGame();
    }
  }
}

function resetBall() {
  ballX = ballSpeedX < 0 ? canvas.width / 4 : canvas.width / 1.5;
  ballY = canvas.height / 2;
  // ballSpeedX = 0;
  // ballSpeedY = 0;
  ballSpeedX = -ballSpeedX;
  // gameState = "paused"; // Pause the game when the ball is reset
}

function startGame() {
  ballSpeedX = 7; // Set initial ball speed
  ballSpeedY = 7;
  gameState = "playing"; // Start the game
}

function endGame() {
  gameState = "paused";
  const canvas = document.getElementById("local-pong-canvas");
  canvas.style.filter = "blur(5px)";
  ballX = canvas.width / 2;
  const replayButton = document.getElementById("local-pong-replay-btn");
  replayButton.textContent = "REPLAY";
  replayButton.style.display = "block";
  returnButton.style.display = "block";

  const winHeader = document.getElementById("win-header");
  winHeader.textContent =
    player1Score === 5 ? "Player 1 wins!" : "Player 2 wins!";
  player1Score = 0;
  player2Score = 0;
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

function handleReplayClick(replayButton) {
  console.log("handleReplayClick");
  const canvas = document.getElementById("local-pong-canvas");
  canvas.style.filter = "blur(0px)";
  const winHeader = document.getElementById("win-header");
  winHeader.textContent = "";
  startGame();
  replayButton.style.display = "none";
  returnButton.style.display = "none";
}

function createReplayButton() {
  const replayButton = document.createElement("button");
  replayButton.textContent = "START GAME";
  replayButton.id = "local-pong-replay-btn";
  replayButton.style.width = "20%";
  replayButton.classList.add("btn");
  replayButton.classList.add("btn-active");
  replayButton.classList.add("dark-btn");
  replayButton.style.opacity = "80%";
  replayButton.style.position = "absolute";
  replayButton.style.top = "50%";
  replayButton.style.left = "50%";
  replayButton.style.transform = "translate(-50%, -50%)";
  replayButton.style.padding = "30px";
  replayButton.style.outline = "3px dashed blue";
  replayButton.style.borderRadius = "10px";
  replayButton.style.fontSize = "16px";
  replayButton.style.cursor = "pointer";
  replayButton.addEventListener("click", () => handleReplayClick(replayButton));
  localPongContainer.appendChild(replayButton);
  const winHeader = document.createElement("h1");
  winHeader.classList.add("glow-blue");
  winHeader.id = "win-header";
  winHeader.style.position = "absolute";
  winHeader.style.top = "50%"; // Center vertically
  winHeader.style.left = "50%"; // Center horizontally
  winHeader.style.transform = "translate(-50%, -200%)"; // Center using translate
  // winHeader.innerHTML = "Player 1 wins!";
  localPongContainer.appendChild(winHeader);
}

function createReturnButton() {
  const returnButton = document.createElement("button");
  returnButton.textContent = "RETURN";
  returnButton.id = "local-pong-replay-btn";
  // returnButton.style.display = "block";
  returnButton.style.width = "20%";

  returnButton.classList.add("btn");
  returnButton.classList.add("btn-active");
  returnButton.classList.add("dark-btn");
  returnButton.style.opacity = "80%";
  returnButton.style.position = "absolute";
  returnButton.style.top = "65%";
  returnButton.style.left = "50%";
  returnButton.style.transform = "translate(-50%, -50%)";
  returnButton.style.padding = "30px";
  returnButton.style.outline = "3px dashed blue";
  returnButton.style.borderRadius = "10px";
  returnButton.style.fontSize = "16px";
  returnButton.style.cursor = "pointer";
  returnButton.addEventListener("click", () => {
    localPongContainer.innerHTML = "";
    switchRoute("/");
  });
  localPongContainer.appendChild(returnButton);
  const winHeader = document.createElement("h1");
  winHeader.classList.add("glow-blue");
  winHeader.id = "win-header";
  winHeader.style.position = "absolute";
  winHeader.style.top = "180%"; // Center vertically
  winHeader.style.left = "50%"; // Center horizontally
  winHeader.style.transform = "translate(-50%, -200%)"; // Center using translate
  // winHeader.innerHTML = "Player 1 wins!";
  localPongContainer.appendChild(winHeader);
  return returnButton;
}

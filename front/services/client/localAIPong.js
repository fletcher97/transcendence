let canvas = document.getElementById("local-pong-canvas");
let ctx = document.getElementById("local-pong-canvas").getContext("2d");
let paddles = [0, 0];
let ball = [0, 0, -0.016, 0];
let score = [0, 0];
let cursor = 0;
let reactionSpeed = 6;
let reactionDistance = -0.5;

canvas.addEventListener("mousemove", (e) => {
  cursor = e.offsetY / 250 - 1;
});

ctx.textAlign = "center";
ctx.font = '50px "Press Start 2P", Arial, sans-serif';
ctx.fillStyle = "white";

const width = 1500;

setInterval(() => {
  if (Math.abs(ball[0]) >= 1) {
    return (() => {
      score[ball[0] < 0 ? 1 : 0]++;
      ball = [0, 0, ball[0] < 0 ? -0.016 : 0.016, 0];
      reactionDistance = -0.5;
      reactionSpeed = 6;
    })();
  }
  ctx.clearRect(0, 0, 500, 500);
  if (Math.abs(ball[1]) >= 1) ball[3] = -ball[3];
  (ball[0] += ball[2]), (ball[1] += ball[3]), (paddles[0] = cursor);
  if (ball[0] > reactionDistance && ball[2] > 0)
    paddles[1] +=
      ball[1] > paddles[1] + 10 / 250
        ? reactionSpeed / 250
        : ball[1] < paddles[1] - 10 / 250
        ? -reactionSpeed / 250
        : 0;
  if (Math.abs(paddles[0]) > 210 / 250)
    paddles[0] = ((paddles[0] / Math.abs(paddles[0])) * 210) / 250;
  if (Math.abs(paddles[1]) > 210 / 250)
    paddles[1] = ((paddles[1] / Math.abs(paddles[1])) * 210) / 250;
  ctx.fillRect(20, paddles[0] * 250 + 225, 10, 50);
  ctx.fillRect(470, paddles[1] * 250 + 225, 10, 50);
  ctx.fillRect(ball[0] * 250 + 245, ball[1] * 250 + 245, 10, 10);
  ctx.fillText(score[0] + " : " + score[1], 250, 100);
  if (
    (ball[0] > -220 / 250 &&
      ball[0] + ball[2] <= -220 / 250 &&
      Math.abs(
        paddles[0] - ball[1] - (ball[3] * (-220 / 250 - ball[0])) / ball[2]
      ) <=
        30 / 250) ||
    (ball[0] < 220 / 250 &&
      ball[0] + ball[2] >= 220 / 250 &&
      Math.abs(
        paddles[1] - ball[1] - (ball[3] * (220 / 250 - ball[0])) / ball[2]
      ) <=
        30 / 250)
  ) {
    let alpha =
      (ball[0] < 0 ? 1 : -1) *
      ((7 / 16) * (Math.atan(ball[3] / -ball[2]) + Math.PI / 2) +
        0.004375 * Math.PI * (ball[1] - paddles[ball[0] < 0 ? 0 : 1]) * 1500 +
        (27 / 64) * Math.PI -
        Math.atan(ball[3] / -ball[2]) +
        (Math.PI * 3) / 8);
    let x = ball[2] * Math.cos(alpha) - ball[3] * Math.sin(alpha),
      y = ball[2] * Math.sin(alpha) + ball[3] * Math.cos(alpha);
    (ball[2] = x * 1.02),
      (ball[3] = y * 1.02),
      (reactionSpeed = Math.random() * 4.5 + 1.7),
      (reactionDistance = Math.random() * 0.7 - 1);
  }
}, 1000 / 60);

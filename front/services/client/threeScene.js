import * as THREE from "three";
import {
  accentColor,
  backgroundColor,
  primaryColor,
} from "../../assets/colors.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth , window.innerHeight );
document.body.appendChild(renderer.domElement);

// Create a cube as the player
const roomGeometry = new THREE.BoxGeometry(20, 20, 20);
const roomMaterial = new THREE.MeshPhysicalMaterial({
  color: accentColor,
  side: THREE.BackSide,
});
const player = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(player);

// put light inside room
const light = new THREE.PointLight(primaryColor, 1000, 100);
light.position.set(0, 1.6, 3);
scene.add(light);

// Handle window resizing
window.addEventListener("resize", () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});

// Handle user input
const arrowKeyState = {};

document.addEventListener("keydown", (event) => {
  arrowKeyState[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  arrowKeyState[event.key] = false;
});

// Initialize ball speed
let ballSpeedX = 0.1;
let ballSpeedY = 0.1;
let ballSpeedZ = 0.1; // Added speed along the z-axis

// Create a Pong ball
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshPhysicalMaterial({ color: primaryColor });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Set the initial position of the ball
ball.position.set(0, 1.6, 3);

// Set up a Box3 for camera collision
const cameraBoundingBox = new THREE.Box3().setFromObject(camera);

// Animate the scene
function animate() {
  requestAnimationFrame(animate);

  ball.position.x += ballSpeedX;
  ball.position.y += ballSpeedY;
  ball.position.z += ballSpeedZ; // Update the position along the z-axis

  // Ball collisions with walls
  if (
    ball.position.y + ball.geometry.parameters.radius > 10 ||
    ball.position.y - ball.geometry.parameters.radius < -10
  ) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ball.position.x + ball.geometry.parameters.radius > 10 ||
    ball.position.x - ball.geometry.parameters.radius < -10
  ) {
    ballSpeedX = -ballSpeedX;
  }

  if (
    ball.position.z + ball.geometry.parameters.radius > 10 ||
    ball.position.z - ball.geometry.parameters.radius < -10
  ) {
    ballSpeedZ = -ballSpeedZ;
  }

  // Check if the ball intersects with the camera
  const ballBoundingBox = new THREE.Box3().setFromObject(ball);
  console.log(ballBoundingBox);

  if (cameraBoundingBox.intersectsBox(ballBoundingBox)) {
    console.log("Hit the ball!");
    // Handle scoring or other actions here
  }

  // Move the player based on arrow keys
  const moveSpeed = 0.2;
  if (arrowKeyState["ArrowUp"] && player.position.y > -8) {
    player.position.y -= moveSpeed;
    // light.position.y -= moveSpeed;
  }
  if (arrowKeyState["ArrowDown"] && player.position.y < 9.8) {
    player.position.y += moveSpeed;
    // light.position.y += moveSpeed;
  }
  if (arrowKeyState["ArrowLeft"] && player.position.x < 9.6) {
    player.position.x += moveSpeed;
    // light.position.x += moveSpeed;
  }
  if (arrowKeyState["ArrowRight"] && player.position.x > -9.5) {
    player.position.x -= moveSpeed;
    // light.position.x -= moveSpeed;
  }

  // Render the scene
  renderer.render(scene, camera);
}

animate();

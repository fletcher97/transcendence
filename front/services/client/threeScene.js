import * as THREE from "three";
// import { Tween, Easing } from "three/addons/loaders/Tween.js";
// import * as TWEEN from "tween.js";
import {
  accentColor,
  backgroundColor,
  primaryColor,
} from "../../assets/colors.js";

console.log("yo frmo three canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const moveSpeed = 0.4;
camera.position.set(0, 1.6, 22);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube as the room
const roomGeometry = new THREE.BoxGeometry(20, 20, 20, 100);
const roomInsideMaterial = {
  color: accentColor,
  side: THREE.DoubleSide,
};
const roomOutsideMaterial = {
  color: accentColor,
  transparent: true,
  opacity: 0.1,
  side: THREE.DoubleSide,
  // wireframe: true,
};
const insideRoomMaterial = new THREE.MeshPhysicalMaterial(roomInsideMaterial);
const outsideRoomMaterial = new THREE.MeshStandardMaterial(roomOutsideMaterial);
const materials = [
  insideRoomMaterial,
  insideRoomMaterial,
  insideRoomMaterial,
  insideRoomMaterial,
  outsideRoomMaterial,
  insideRoomMaterial,
];

const room = new THREE.Mesh(roomGeometry, materials);
scene.add(room);

// add paddle
const paddleGeometry = new THREE.PlaneGeometry(3, 3);
const paddleMaterial = new THREE.MeshBasicMaterial({
  color: primaryColor,
  side: THREE.DoubleSide,
  transparent: true, // Enable transparency
  opacity: 0.5,
});
const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);
scene.add(paddle);
paddle.position.set(0, 0, 10);

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
const mouse = new THREE.Vector2();

document.addEventListener("mousemove", (event) => {
  // Update the mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the position of the paddle based on mouse coordinates
  const paddleIntersection = getMouseIntersection(paddle);
  if (paddleIntersection) {
    paddle.position.copy(paddleIntersection.point);
  }
});

document.addEventListener("keydown", (event) => {
  arrowKeyState[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  arrowKeyState[event.key] = false;
});

// Initialize ball speed
let ballSpeedX = 0.2;
let ballSpeedY = 0.2;
let ballSpeedZ = 0.2; // Added speed along the z-axis

// Create a Pong ball
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshPhysicalMaterial({ color: "pink" });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Set the initial position of the ball
ball.position.set(0, 7.6, 3);

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
  const paddleBoundingBox = new THREE.Box3().setFromObject(paddle);

  if (paddleBoundingBox.intersectsBox(ballBoundingBox)) {
    console.log("ballboundingbox: ", ballBoundingBox);
    console.log("paddleBoundingBox: ", paddleBoundingBox);
    console.log("Hit the ball!");
    tweenColor(paddleMaterial, 0xff0000); // Change to your desired color

    const paddleIntersection = getMouseIntersection(paddle);

    const normal = paddleIntersection.face.normal.clone();
    const incident = new THREE.Vector3(ballSpeedX, ballSpeedY, ballSpeedZ);
    // const reflection = new THREE.Vector3().reflect(incident, normal);
    // console.log("reflection: ", reflection);

    ballSpeedX += 0.1;
    ballSpeedY += 0.1;
    ballSpeedZ += 0.1;

    // Handle scoring or other actions here
  }

  // Move the room based on arrow keys

  if (arrowKeyState["ArrowDown"] && room.position.y > -8) {
    camera.position.y -= moveSpeed;
    // light.position.y -= moveSpeed;
  }
  if (arrowKeyState["ArrowUp"] && room.position.y < 9.8) {
    camera.position.y += moveSpeed;
    // light.position.y += moveSpeed;
  }
  if (arrowKeyState["ArrowRight"] && room.position.x < 9.6) {
    camera.position.x += moveSpeed;
    // light.position.x += moveSpeed;
  }
  if (arrowKeyState["ArrowLeft"] && room.position.x > -9.5) {
    camera.position.x -= moveSpeed;
    // light.position.x -= moveSpeed;
  }

  TWEEN.update();

  // Render the scene
  renderer.render(scene, camera);
}

function getMouseIntersection(object) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(object);
  return intersects.length > 0 ? intersects[0] : null;
}

// Function to tween color smoothly
function tweenColor(material, targetColor) {
  // Define the initial color
  const startColor = material.color.getHex();

  // Create a new tween
  new TWEEN.Tween({ color: startColor })
    .to({ color: targetColor }, 1000) // Duration of the transition in milliseconds
    .easing(TWEEN.Easing.Quadratic.Out) // Use a different easing function if needed
    .onUpdate(function (object) {
      // Update the material color during the tween
      material.color.setHex(Math.floor(object.color));
    })
    .start(); // Start the tween
}

animate();

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  accentColor,
  backgroundColor,
  primaryColor,
} from "../../assets/colors.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, 700 / 700, 0.1, 1000);
const moveSpeed = 0.4;
camera.position.set(0, 0, 18);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#three-canvas"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(600, 600);
document.body.appendChild(renderer.domElement);

document.getElementById("meta-score-1").innerHTML = "0";
document.getElementById("meta-score-2").innerHTML = "0";
let scoreOne = 0;
let scoreTwo = 0;

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

// add paddle
const playerWallGeometry = new THREE.PlaneGeometry(20, 20);
const playerWallMaterial = new THREE.MeshBasicMaterial({
  // side: THREE.DoubleSide,
  transparent: true, // Enable transparency
  opacity: 0,
});
const playerWallOne = new THREE.Mesh(playerWallGeometry, playerWallMaterial);
const playerWallTwo = new THREE.Mesh(playerWallGeometry, playerWallMaterial);
scene.add(playerWallOne);
scene.add(playerWallTwo);
playerWallOne.position.set(0, 0, 10);
playerWallTwo.position.set(0, 0, -10);
console.log("playerWallTwoPos: ", playerWallTwo.position);

// Add AI opponent
const opponentPaddle = new THREE.Mesh(paddleGeometry, paddleMaterial.clone());
scene.add(opponentPaddle);
opponentPaddle.position.set(0, 0, -10); // Position the opponent on the opposite face

// put light inside room
const light = new THREE.PointLight(primaryColor, 1000, 100);
light.position.set(0, 1.6, 3);
scene.add(light);

// Handle window resizing
// window.addEventListener("resize", () => {
//   const newWidth = window.innerWidth;
//   const newHeight = window.innerHeight;
//   camera.aspect = newWidth / newHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(newWidth, newHeight);
// });

// Handle user input
const arrowKeyState = {};
const mouse = new THREE.Vector2();

document.addEventListener("mousemove", (event) => {
  // Update the mouse coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  console.log("mouse coor: ", mouse);

  // Update the position of the paddle based on mouse coordinates
  const paddleIntersection = getMouseIntersection(paddle);
  if (paddleIntersection) {
    paddle.position.copy(paddleIntersection.point);
  }
});

// document.addEventListener("keydown", (event) => {
//   arrowKeyState[event.key] = true;
// });

// document.addEventListener("keyup", (event) => {
//   arrowKeyState[event.key] = false;
// });

// Initialize ball speed
let ballSpeedX = 0.35;
let ballSpeedY = 0.2;
let ballSpeedZ = 0.2; // Added speed along the z-axis

// Create a Pong ball
const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const ballMaterial = new THREE.MeshPhysicalMaterial({ color: "pink" });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
scene.add(ball);

// Set the initial position of the ball
ball.position.set(0, 7.6, 3);
const loader = new GLTFLoader();
let frame;

loader.load("/assets/frame.glb", (gltf) => {
  frame = gltf.scene;
  scene.add(frame);

  // Set the initial position of the frame
  // frame.position.y = ball.position.y;
  frame.position.x = -10;
  frame.position.y = 0;
  frame.position.z = 0;
  frame.rotation.set(0, Math.PI / 2, 0);
  frame.scale.set(10, 10, 10);
});

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

  if (frame) {
    frame.position.z = ball.position.z;
  }

  // innerFrame.position.z = ball.position.z;

  // Check if the ball intersects with the camera
  const ballBoundingBox = new THREE.Box3().setFromObject(ball);
  const paddleBoundingBox = new THREE.Box3().setFromObject(paddle);
  const playerWallOneBoundingBox = new THREE.Box3().setFromObject(
    playerWallOne
  );

  if (paddleBoundingBox.intersectsBox(ballBoundingBox)) {
    console.log("Hit the ball!");
    const announceHeader = document.getElementById("meta-announce");
    announceHeader.innerHTML = "";

    tweenColor(paddleMaterial, 0xff0000); // Change to your desired color

    const intersectionPoint = ball.position.clone();
    paddle.worldToLocal(intersectionPoint);

    // Normalize the intersection point to be in the range [-0.5, 0.5]
    intersectionPoint.x /= paddle.geometry.parameters.width;
    intersectionPoint.y /= paddle.geometry.parameters.height;

    // Calculate the normal vector at the point of contact on the paddle
    const normalVector = new THREE.Vector3(0, 0, 1); // Assuming the paddle is aligned with the Z-axis
    normalVector.applyQuaternion(paddle.quaternion);

    // Reflect the ball's velocity vector across the normal vector
    const incidentVector = new THREE.Vector3(
      ballSpeedX,
      ballSpeedY,
      ballSpeedZ
    );
    const reflectedVector = incidentVector.reflect(normalVector);

    // Update the ball's speed based on the reflected vector
    ballSpeedX = reflectedVector.x * generateRandomFloatBetween(1, 1);
    ballSpeedY = reflectedVector.y * generateRandomFloatBetween(1, 1);
    ball.position.z += ballSpeedZ;
  } else if (playerWallOneBoundingBox.intersectsBox(ballBoundingBox)) {
    scoreOne++;
    const scoreOneHeader = document.getElementById("meta-score-1");
    scoreOneHeader.innerHTML = scoreOne;
  }

  // Move the room based on arrow keys

  // if (arrowKeyState["ArrowDown"] && room.position.y > -8) {
  //   camera.position.y -= moveSpeed;
  //   // light.position.y -= moveSpeed;
  // }
  // if (arrowKeyState["ArrowUp"] && room.position.y < 9.8) {
  //   camera.position.y += moveSpeed;
  //   // light.position.y += moveSpeed;
  // }
  // if (arrowKeyState["ArrowRight"] && room.position.x < 9.6) {
  //   camera.position.x += moveSpeed;
  //   // light.position.x += moveSpeed;
  // }
  // if (arrowKeyState["ArrowLeft"] && room.position.x > -9.5) {
  //   camera.position.x -= moveSpeed;
  //   // light.position.x -= moveSpeed;
  // }

  TWEEN.update();
  paddleMaterial.color.setHex("FFFFFF");
  updateOpponentPaddle();

  // Render the scene
  renderer.render(scene, camera);
}

function updateOpponentPaddle() {
  const anticipationTime = 0.1; // Time in seconds for AI anticipation
  const difficultyFactor = 0.12; // Adjust difficulty responsiveness
  // Calculate the difference in position between the ball and the opponent paddle
  // Calculate the anticipated position of the ball after anticipationTime seconds
  const anticipatedBallPositionX =
    ball.position.x + anticipationTime * ballSpeedX;
  const anticipatedBallPositionY =
    ball.position.y + anticipationTime * ballSpeedY;

  // Calculate the differences between the AI's current position and the anticipated ball position
  const diffX = anticipatedBallPositionX - opponentPaddle.position.x;
  const diffY = anticipatedBallPositionY - opponentPaddle.position.y;

  // Smoothly adjust the opponent paddle's X and Y coordinates towards the anticipated position
  opponentPaddle.position.x += diffX * difficultyFactor;
  opponentPaddle.position.y += diffY * difficultyFactor;

  // Optional: Clamp the opponent paddle's coordinates within certain ranges
  const minX = -10;
  const maxX = 10;
  const minY = -10;
  const maxY = 10;

  opponentPaddle.position.x = Math.max(
    minX,
    Math.min(maxX, opponentPaddle.position.x)
  );
  opponentPaddle.position.y = Math.max(
    minY,
    Math.min(maxY, opponentPaddle.position.y)
  );

  // opponentPaddle.position.x += speed * Math.cos(angle);
  // opponentPaddle.position.y += speed * Math.sin(angle);
  const opponentBoundingBox = new THREE.Box3().setFromObject(opponentPaddle);
  const ballBoundingBox = new THREE.Box3().setFromObject(ball);
  const playerWallTwoBoundingBox = new THREE.Box3().setFromObject(
    playerWallTwo
  );

  if (opponentBoundingBox.intersectsBox(ballBoundingBox)) {
    console.log("Opponent hit the ball!");
    const intersectionPoint = ball.position.clone();
    paddle.worldToLocal(intersectionPoint);

    // Normalize the intersection point to be in the range [-0.5, 0.5]
    intersectionPoint.x /= paddle.geometry.parameters.width;
    intersectionPoint.y /= paddle.geometry.parameters.height;

    // Calculate the normal vector at the point of contact on the paddle
    const normalVector = new THREE.Vector3(0, 0, 1); // Assuming the paddle is aligned with the Z-axis
    normalVector.applyQuaternion(paddle.quaternion);

    // Reflect the ball's velocity vector across the normal vector
    const incidentVector = new THREE.Vector3(
      ballSpeedX,
      ballSpeedY,
      ballSpeedZ
    );
    const reflectedVector = incidentVector.reflect(normalVector);

    // Update the ball's speed based on the reflected vector
    ballSpeedX = reflectedVector.x;
    ballSpeedY = reflectedVector.y;
    ball.position.z += ballSpeedZ;
  } else if (playerWallTwoBoundingBox.intersectsBox(ballBoundingBox)) {
    scoreTwo++;
    document.getElementById("meta-score-2").innerHTML = scoreTwo;
  }
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

function generateRandomFloatBetween(min, max) {
  return Math.random() * (max - min) + min;
}

animate();

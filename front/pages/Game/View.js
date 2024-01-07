// import AbstractView from "../AbstractView.js";

import { drawPong } from "/scripts/drawPong.js";
import FRONT_ENV from "../../config.js";

export default class GameView {
  constructor(switchRoute, room) {
    // super();
    this.room = room;
    this.initialRender();
    console.log("this.room: ", this.room);
    this.activeTab = "dashboard-button";
    this.activeTabElement;
    this.switchRoute = switchRoute;
  }

  async render(view) {}

  addEventListeners = async () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    console.log("this.room in addEvent: ", this.room);

    // dom
    const socket = new WebSocket(
      `${FRONT_ENV.WEB_SOCKET_URL}/pong/room/${this.room.name}`
    );
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");
      // Example: Send a message to the server
      const message = { type: "connect", room_name: this.room.name };
      socket.send(JSON.stringify(message));

      socket.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("Message from server ", receivedMessage);
        // Process the received message as needed
        drawPong(receivedMessage, canvas, ctx);
      });
      // send socket message on kew up or down
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          const key = event.key === "ArrowUp" ? 1 : -1;
          const message = {
            type: "movement",
            key: key,
          };
          console.log("inside keydown");
          socket.send(JSON.stringify(message));
        }
      });
    });
  };

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    console.log("initial render");
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = `
      <div class="min-vh-100">
        <div class="d-flex justify-content-between align-items-center">
          <div class="min-vh-100 container d-flex row justify-content-between game-panel">
            <h2>${this.room.name}</h2>
            <h2>yo</h2>
            <button id="game-ready-btn" class="btn" style="background-color:#FF47AE">Ready?</button>
          </div>
          <div class="">
            <canvas id="game-canvas" width="700" height="500"></canvas>
          </div>
        </div>
      </div>
          
          `;
      // await this.render("dashboardView");
      this.addEventListeners();
      // <canvas id="three-canvas"></canvas>
    }
  }
}

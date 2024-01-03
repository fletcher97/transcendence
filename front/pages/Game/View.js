// import AbstractView from "../AbstractView.js";

import { drawPong } from "/scripts/drawPong.js";
import FRONT_ENV from "../../config.js";

export default class GameView {
  constructor(switchRoute, room) {
    // super();
    console.log("room in game view: ", room);
    this.room = room;
    this.initialRender();
    console.log("this.room: ", this.room);
    this.activeTab = "dashboard-button";
    this.activeTabElement;
    this.switchRoute = switchRoute;
  }

  async render(view) {}

  addEventListeners = async () => {
    console.log("this.room in addEvent: ", this.room);
    // dom
    const socket = new WebSocket(
      `${FRONT_ENV.WEB_SOCKET_URL}/pong/room/${this.room.name}`
    );
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");

      // Example: Send a message to the server

      const message = { room_name: this.room.name };
      socket.send(JSON.stringify(message));

      socket.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("Received message:", receivedMessage);
        // Process the received message as needed
        drawPong(receivedMessage);
      });
    });
    // document.addEventListener("DOMContentLoaded", () => {
    //   playPong();
    // });
  };

  //   <audio controls autoplay style="display:none">
  //   <source src="/assets/lcd.mp3" type="audio/mp3">
  //   Your browser does not support the audio element.
  // </audio>

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    console.log("initial render");
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = `
      <div class="min-vh-100">
        <canvas id="gameCanvas" width="800" height="800"></canvas>
      </div>
          
          `;
      // await this.render("dashboardView");
      this.addEventListeners();
      // <canvas id="three-canvas"></canvas>
    }
  }
}

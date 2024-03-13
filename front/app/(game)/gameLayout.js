import { drawPong } from "/services/client/drawPong.js";
import { newClassicPongSocket } from "../../services/api/classicPongSocket.js";

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

  updateUi = (message) => {
    // update ui based on message
    // get button with #id score-player-one
    // get button with #id score-player-two
    // get button with #id game-ready-btn
    // update the innerText of these buttons
    console.log("inside updateUi with message: ", message);
    const scorePlayerOne = document.getElementById("score-player-one");
    const scorePlayerTwo = document.getElementById("score-player-two");
    const roomNameHeader = document.getElementById("room-name-header");
    scorePlayerOne.innerText = message.players.p1.points;
    scorePlayerTwo.innerText = message.players.p2.points;
    roomNameHeader.innerText = message.name;
  };

  addEventListeners = async () => {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    console.log("this.room in addEvent: ", this.room);

    const exitRoomBtn = document.getElementById("room-log-out-btn");

    exitRoomBtn.addEventListener("click", () => {
      this.switchRoute("/dashboard");
    });

    // add event listener for ready-btn
    const readyBtn = document.getElementById("game-ready-btn");
    readyBtn.addEventListener("click", () => {
      // ** SEND STATUS MESSAGE TO SOCKET ** //
      let message = {};
      if (readyBtn.innerText === "Ready?") {
        message = {
          type: "status",
          value: "ready",
        };
      } else {
        message = {
          type: "status",
          value: "not ready",
        };
      }
      readyBtn.innerText =
        readyBtn.innerText === "Ready?" ? "Not Ready" : "Ready?";
      socket.send(JSON.stringify(message));
    });

    // dom
    // const socket = new WebSocket(
    //   `${FRONT_DEV_ENV.WEB_SOCKET_URL}/ws/${this.room.name}`
    // );
    const socket = newClassicPongSocket(this.room.name);
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");
      // ** SEND CONNECT MESSAGE TO SOCKET ** //
      const message = { type: "connect", room_name: this.room.name };
      socket.send(JSON.stringify(message));

      socket.addEventListener("message", (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("Message from server ", receivedMessage);
        // Process the received message as needed
        this.updateUi(receivedMessage);
        drawPong(receivedMessage, canvas, ctx);
      });
      // send socket message on kew up or down
      document.addEventListener("keydown", (event) => {
        // ** SEND MOVEMENT MESSAGE TO SOCKET ** //
        if (event.key === "ArrowUp" || event.key === "ArrowDown") {
          const key = event.key === "ArrowUp" ? 1 : -1;
          const message = {
            type: "movement",
            key: key,
          };
          socket.send(JSON.stringify(message));
        }
      });
    });
  };

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    console.log("initial render");
    const content = document.getElementById("app");
    if (content) {
      content.innerHTML = `
      <div  class="min-vh-100">
        <div class="d-flex justify-content-between">
          <div class="min-vh-100 container d-flex row justify-content-between game-panel m-0 p-3">
            <h2 id="room-name-header" class="glow">${this.room.name}</h2>
            <div id="room-log-out-btn">
              <img src="/assets/log-out-icon.svg" alt="log out" width="30" height="30" />
            </div>
            <div class="d-flex row align-items-end">
            <button id="game-ready-btn" class="btn btn-sm" >Ready?</button>
            </div>
          </div>
          <div class="container row m-0 p-0">
            <canvas id="game-canvas" height="300" width="800"></canvas>
            <div class="d-flex justify-content-around gap-0">
              <h1 id="score-player-one"></h1>
              <h1>-</h1>
              <h1 id="score-player-two"></h1>
            </div>
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

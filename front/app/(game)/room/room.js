import { DOMAIN_NAME } from "../../../config.js";
import getUser from "../../../services/api/users/getUser.js";

export default class RoomPage {
  constructor(switchRoute, roomId) {
    this.userId = localStorage.getItem("user_id");
    this.roomId = roomId;
    this.me = null;
    console.log("roomId in RoomPage: ", roomId);
    console.log("room page constructor");
    this.players = [];
    this.matchWinner;
    this.initRoom();
  }

  initRoom = async () => {
    this.content = document.getElementById("app");
    await this.fetchData();
    this.content.innerHTML = this.getLobbyHtml();
    this.addLobbyEventListeners();
  };

  fetchData = async () => {
    this.me = await getUser(this.userId);
    console.log("this.me: ", this.me);
  };

  addLobbyEventListeners = async () => {
    const menuContainer = document.getElementById("local-tournament-menu");
    const returnButton = document.getElementById("local-tournament-return-btn");
    const socketMsgBtn = document.getElementById("socket-msg");
    const readyBtn = document.getElementById("ready-btn");
    const userOneInput = document.getElementById("tournament-user-input-1");
    const userTwoInput = document.getElementById("tournament-user-input-2");
    const userThreeInput = document.getElementById("tournament-user-input-3");
    const userFourInput = document.getElementById("tournament-user-input-4");
    const userInputArray = [
      userOneInput,
      userTwoInput,
      userThreeInput,
      userFourInput,
    ];

    const socket = new WebSocket(`wss://${DOMAIN_NAME}:443/ws/rooms`);

    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened");
    });
    socket.addEventListener("message", (event) => {
      console.log(`Received: ${event.data}`);
    });
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed");
    });

    socketMsgBtn.addEventListener("click", () => {
      socket.send("LOL");
    });

    readyBtn.addEventListener("click", async () => {
      console.log("readyBtn: ", readyBtn);
      readyBtn.innerText = "Unready";
      // this.addPlayEventListeners();
    });

    returnButton.addEventListener("click", async () => {
      switchRoute("/dashboard");
    });
  };

  addPlayEventListeners = async () => {
    const menuContainer = document.getElementById("local-tournament-menu");
    const playButton = document.getElementById("local-tournament-play-btn");
    const nextButton = document.getElementById("local-tournament-next-btn");
    const header = document.getElementById("local-tournament-header");

    playButton.addEventListener("click", async () => {
      console.log("play event listener");
      menuContainer.style.display = "none";
      const canvas = document.getElementById("local-pong-canvas");
      canvas.style.filter = "blur(0px)";
      this.winner = await initLocalPongGame();
      console.log("winner: ", this.winner);
      console.log("bronzefinalists.length: ", this.bronzeFinalists.length);
      console.log("players.length: ", this.players.length);
      if (this.bronzeFinalists.length == 2) {
        this.players = [];
        console.log("entering bronze match");
        this.scoreboard.unshift(
          this.bronzeFinalists[this.winner === 1 ? 0 : 1],
          this.bronzeFinalists[this.winner === 1 ? 1 : 0]
        );
        this.matchWinner = this.scoreboard[0];
        this.bronzeFinalists = [];
        // this.bronzeFinalists = [];
      } else if (this.finalists.length == 2) {
        console.log("entering final match");
        this.scoreboard.unshift(
          this.finalists[this.winner === 1 ? 0 : 1], // Adds the first finalist based on the winner condition
          this.finalists[this.winner === 1 ? 1 : 0] // Adds the second finalist based on the winner condition
        );
        this.matchWinner = this.scoreboard[0];
      } else {
        this.matchWinner = this.players[this.winner - 1];
        this.finalists.push(this.players[this.winner - 1]);
        this.bronzeFinalists.push(this.players[this.winner === 1 ? 1 : 0]);
        this.players.shift();
        this.players.shift();
        this.currentPlayers = [];
      }
      if (this.players.length === 0) {
        if (this.bronzeFinalists.length === 0) {
          console.log("should enter here after 3d game");
          this.currentPlayers = [...this.finalists];
        } else {
          console.log("should enter here after 2nd game");
          this.currentPlayers = [...this.bronzeFinalists];
        }
      } else {
        this.currentPlayers = [...this.players];
      }
      console.log("finalist: ", this.finalists);
      console.log("bronzeFinalist: ", this.bronzeFinalists);
      console.log("players after match: ", this.players);
      console.log("currentPlayers after match: ", this.currentPlayers);
      console.log("scoreboard: ", this.scoreboard);
      console.log("scoreboard length: ", this.scoreboard.length);
      menuContainer.style.display = "";
      canvas.style.filter = "blur(5px)";
      if (this.scoreboard.length === 4) {
        header.innerHTML = `
        ${this.scoreboard[0]} wins the tournament!
        <div class="d-flex row align-items-center">
          <ol>
            ${this.scoreboard.map((player) => `<li>${player}</li>`).join("")}
          </ol>
        </div>
          `;
        playButton.innerHTML = "RETURN HOME";
        playButton.onclick = () => {
          switchRoute("/dashboard");
        };
      } else {
        playButton.style.display = "none";
        nextButton.style.display = "block";
        header.innerHTML = `${this.matchWinner} wins!`;
      }
    });

    nextButton.addEventListener("click", async () => {
      nextButton.style.display = "none";
      playButton.style.display = "block";
      header.innerHTML = `${this.currentPlayers[0]} vs. ${this.currentPlayers[1]}`;
    });
  };

  getLobbyHtml = () => {
    return `
        <div id="local-tournament-menu" class="local-pong-menu">
            <h3 class="glow">players</h3>
            <div class="d-flex justify-content-between gap-4">
              <h4 class="glow-blue">${this.me.username}</h4>
              <h4 class="glow-blue">${0 ? "✓" : "X"}</h4>
              </div>
              
              <button id="ready-btn" class="btn dark-btn pink-btn">Ready?</button>
              <button class="btn pink-btn dark-btn" id="local-tournament-return-btn"><--</button>
              <button id="socket-msg" class="btn dark-btn pink-btn">message</button>
              </div> 
    `;
  };

  getPlayHtml = () => {
    return `
        <div class="row align-items-center" style="min-height: 95vh">
          <div id="local-tournament-menu" class="local-pong-menu">
          <h1 id="local-tournament-header" class="glow-blue">${this.players[0]} vs. ${this.players[1]}</h1>  
          <div class="d-flex flex-column gap-4">
              <button class="btn pink-btn   dark-btn pong-menu-btn" id="local-tournament-play-btn">PLAY</button>
              <button style="display:none;" class="btn pink-btn dark-btn pong-menu-btn" id="local-tournament-next-btn">NEXT</button>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center full-height">
            <canvas height="500" width="700" id="local-pong-canvas"></canvas>
          </div>
        </div>
`;
  };
}

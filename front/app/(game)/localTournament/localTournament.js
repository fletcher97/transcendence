import { switchRoute } from "../../../index.js";
import { initLocalPongGame } from "../../../services/client/localPong.js";
import {
  containsOnlyNumbersOrAlphabets,
  validateTournamentUserInput,
} from "../../../services/client/utils.js";

export default class LocalTournamentPage {
  constructor(switchRoute, switchPage) {
    this.content = document.getElementById("app");
    this.players = [];
    this.finalists = [];
    this.bronzeFinalists = [];
    this.currentPlayers = [];
    this.scoreboard = [];
    this.winner = 0;
    this.matchWinner;
    if (this.content) {
      this.content.innerHTML = this.getRegisterHtml();
      this.addRegisterEventListeners();
    }
  }

  addRegisterEventListeners = async () => {
    const menuContainer = document.getElementById("local-tournament-menu");
    const returnButton = document.getElementById("local-tournament-return-btn");
    const createLocalTournamentButton = document.getElementById(
      "create-local-tournament-btn"
    );
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

    userOneInput.addEventListener("input", () => {
      if (validateTournamentUserInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userTwoInput.addEventListener("input", () => {
      if (validateTournamentUserInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userThreeInput.addEventListener("input", () => {
      if (validateTournamentUserInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userFourInput.addEventListener("input", () => {
      if (validateTournamentUserInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });

    createLocalTournamentButton.addEventListener("click", async () => {
      this.players = [
        userInputArray[0].value,
        userInputArray[1].value,
        userInputArray[2].value,
        userInputArray[3].value,
      ];
      this.currentPlayers = [...this.players];
      console.log("players: ", this.players);
      console.log("currentPlayers: ", this.currentPlayers);
      this.content.innerHTML = this.getPlayHtml();
      this.addPlayEventListeners();
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

  getRegisterHtml = () => {
    return `
        <div id="local-tournament-menu" class="local-pong-menu">
            <div class="row">
                <h4>player1</h4>
                <input class="input-box" type="text" id="tournament-user-input-1" name="username" placeholder="player 1"/>
            </div>
            <div class="row">
                <h4>player1</h4>
                <input class="input-box" type="text" id="tournament-user-input-2" name="username" placeholder="player 2"/>
            </div>
            <div class="row">
                <h4>player1</h4>
                <input class="input-box" type="text" id="tournament-user-input-3" name="username" placeholder="player 3"/>
            </div>
            <div class="row">
                <h4>player1</h4>
                <input class="input-box" type="text" id="tournament-user-input-4" name="username" placeholder="player 4"/>
            </div>
            <button id="create-local-tournament-btn" disabled class="btn dark-btn pink-btn">create tournament</button>
            <button class="btn pink-btn dark-btn" id="local-tournament-return-btn"><--</button>
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

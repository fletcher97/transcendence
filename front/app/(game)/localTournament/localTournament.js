import { switchRoute } from "../../../index.js";
import { initLocalPongGame } from "../../../services/client/localPong.js";
import { containsOnlyNumbersOrAlphabets } from "../../../services/client/utils.js";

export default class LocalTournamentPage {
  constructor(switchRoute, switchPage) {
    this.content = document.getElementById("app");
    this.players = [];
    this.winners = [];
    this.winner = 0;
    if (this.content) {
      this.content.innerHTML = this.getRegisterHtml();
      this.addEventListeners();
    }
  }

  validateInput = (
    userOneInput,
    userTwoInput,
    userThreeInput,
    userFourInput
  ) => {
    console.log("userinput: ", userOneInput);
    if (
      userOneInput.value.trim() !== "" &&
      userTwoInput.value.trim() !== "" &&
      userThreeInput.value.trim() !== "" &&
      userFourInput.value.trim() !== ""
    ) {
      if (
        containsOnlyNumbersOrAlphabets(userOneInput.value.trim()) &&
        containsOnlyNumbersOrAlphabets(userTwoInput.value.trim()) &&
        containsOnlyNumbersOrAlphabets(userThreeInput.value.trim()) &&
        containsOnlyNumbersOrAlphabets(userFourInput.value.trim())
      )
        return true;
    }
    return false;
  };

  addEventListeners = async () => {
    const menuContainer = document.getElementById("local-pong-menu");
    const playButton = document.getElementById("local-pong-play-btn");
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

    if (playButton) {
      playButton.addEventListener("click", async () => {
        menuContainer.style.display = "none";
        const canvas = document.getElementById("local-pong-canvas");
        canvas.style.filter = "blur(0px)";
        this.winner = await initLocalPongGame();
        console.log("winner: ", this.winner);
        menuContainer.style.display = "";
        canvas.style.filter = "blur(5px)";
        document.getElementById("local-pong-play-btn").innerHTML = "replay";
        document.getElementById(
          "local-pong-win-header"
        ).innerHTML = `player ${this.winner} wins!`;
      });
    }

    userOneInput.addEventListener("input", () => {
      if (this.validateInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userTwoInput.addEventListener("input", () => {
      if (this.validateInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userThreeInput.addEventListener("input", () => {
      if (this.validateInput(...userInputArray)) {
        createLocalTournamentButton.disabled = false;
      } else {
        createLocalTournamentButton.disabled = true;
      }
    });
    userFourInput.addEventListener("input", () => {
      if (this.validateInput(...userInputArray)) {
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
      console.log("players: ", this.players);
      this.content.innerHTML = this.getPlayHtml();
    });

    returnButton.addEventListener("click", async () => {
      switchRoute("/dashboard");
    });
  };

  getRegisterHtml = () => {
    return `
        <div id="local-pong-menu" class="">
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
      <div id="local-pong-menu" class="">
      <h1 id="local-tournamnet-header" class="glow-blue">${this.players[0]} vs. ${this.players[1]}</h1>  
      <div class="d-flex flex-column gap-4">
          <button class="btn pink-btn   dark-btn pong-menu-btn" id="local-pong-play-btn">play</button>
          <button class="btn pink-btn  dark-btn pong-menu-btn" id="local-pong-return-btn">return</button>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center full-height">
        <canvas height="500" width="700" id="local-pong-canvas"></canvas>
      </div>
    </div>
`;
  };
}

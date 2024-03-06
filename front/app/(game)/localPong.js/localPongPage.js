import { switchRoute } from "../../../index.js";
import { initLocalPongGame } from "../../../services/client/localPong.js";

export default class LocalPongPage {
  constructor(switchRoute, switchPage) {
    const content = document.getElementById("app");
    this.winner = 0;
    if (content) {
      console.log("content: ", content);
      content.innerHTML = this.getHtml();
      this.addEventListeners();
    }
  }

  addEventListeners = async () => {
    const menuContainer = document.getElementById("local-pong-menu");
    const playButton = document.getElementById("local-pong-play-btn");
    const returnButton = document.getElementById("local-pong-return-btn");

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

    returnButton.addEventListener("click", async () => {
      switchRoute("/dashboard");
    });
  };

  getHtml = () => {
    return `
    <div class="row align-items-center" style="min-height: 95vh">
      <div id="local-pong-menu" class="local-pong-menu">
      <h1 id="local-pong-win-header" class="glow-blue"></h1>  
      <div class="d-flex flex-column gap-4">
          <button class="btn pink-btn   dark-btn pong-menu-btn" id="local-pong-play-btn">play</button>
          <button class="btn pink-btn  dark-btn pong-menu-btn" id="local-pong-return-btn"><--</button>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center full-height">
        <canvas height="500" width="700" id="local-pong-canvas"></canvas>
      </div>
    </div>
`;
  };
}

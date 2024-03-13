import { DashboardRoomBox } from "../../../../../components/DashboardRoomBox.js";
import getUser from "../../../services/api/users/getUser.js";
import { fetchData } from "./fetchData.js";

export default class DashboardView {
  constructor(switchRoute, switchView) {
    this.userId = localStorage.getItem("user_id");
    this.me = null;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
  }

  renderView = async () => {
    console.log("fetched data in dashboard: ", await fetchData());
    this.me = await getUser(this.userId);
    console.log("this.me: ", this.me);
    // history.pushState({ route: "/dashboard" }, null, "/dashboard");
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    const localPongButton = document.querySelector("#play-local-pong-btn");
    const metaPongButton = document.querySelector("#play-meta-pong-btn");

    const multiplayerButton = document.querySelector("#play-multiplayer-btn");
    const localTournamentButton = document.querySelector(
      "#play-local-tournament-btn"
    );


    this.activeTabElement = document.getElementById(this.activeTab);
    // Add click event listener
    if (localPongButton) {
      localPongButton.addEventListener("click", () => {
        this.switchRoute("/game/local-pong");
      });
    }
    if (metaPongButton) {
      metaPongButton.addEventListener("click", () => {
        this.switchRoute("/game/meta-pong");
      });
    }

    if (localTournamentButton) {
      localTournamentButton.addEventListener("click", () => {
        this.switchRoute("/game/local-tournament");
      });
    }


    if (multiplayerButton) {
      multiplayerButton.addEventListener("click", () => {
        this.switchRoute("/multiplayer");
      });
    }

  };




  getHtml = async () => {
    return `
    <div class="d-flex justify-content-center align-items-center gap-4 w-100 mh-100" style="min-height:78vh;">
      <div class="row align-items-center justify-content-between gap-4">
        <div class="justify-content-center d-flex">
          <button class="btn dark-btn pink-btn" id="play-local-pong-btn">LOCAL PONG</button>
        </div>
        <div class="justify-content-center d-flex">
        <button class="btn dark-btn pink-btn" id="play-multiplayer-btn">MULTIPLAYER</button>
        </div>
        <div class="justify-content-center d-flex">
        <button class="btn dark-btn pink-btn" id="play-local-tournament-btn">LOCAL TOURNAMENT</button>
        </div>
        <div class="justify-content-center d-flex">
          <button class="btn meta-pong-btn" id="play-meta-pong-btn">3D PONG</button>
        </div>
      </div>
    </div>`;
  };
}

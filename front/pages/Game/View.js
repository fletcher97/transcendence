// import AbstractView from "../AbstractView.js";

import { playPong } from "/scripts/pongGame.js";

export default class GameView {
  constructor(switchRoute, room) {
    // super();
    console.log("room in game view: ", room);
    this.initialRender();
    this.room = room;
    this.activeTab = "dashboard-button";
    this.activeTabElement;
    this.switchRoute = switchRoute;
  }

  async render(view) {}

  async addEventListeners() {
    // dom
    document.addEventListener("DOMContentLoaded", () => {
      playPong();
    });
  }

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

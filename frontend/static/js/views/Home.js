import AbstractView from "./AbstractView.js";
import classicPongComponent from "../../../components/classicPongImage.js";
import drawClassicPong from "../../../scripts/drawClassicPong.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.isLoading = true;
    this.data = null;
    this.headerText = "lool";
    this.username = "";
    this.fetchData();
    this.render = this.render.bind(this);
    this.getHtml = this.getHtml.bind(this); // Bind the getHtml method
  }

  async fetchData() {
    try {
      this.username = localStorage.getItem("username");
      console.log(localStorage);
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      this.data = "Fetched data";
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false;
      await this.render();
    }
  }

  async render() {
    const content = document.getElementById("content");
    console.log("this.username: ", this.username);
    if (content) {
      content.innerHTML = this.getHtml();
      this.addEventListeners();
    }
  }

  addEventListeners() {
    const showStatsButton = document.querySelector("#show-stats-btn");
    this.headerText = "this is now react";

    if (showStatsButton) {
      showStatsButton.addEventListener("click", () => {
        this.showStatisticsPopup();
      });
    }

    const pingPongCanvas = document.querySelector("#classic-pong-canvas");
    console.log(pingPongCanvas);
    if (pingPongCanvas) drawClassicPong();

    const startNewGameButton = document.querySelector("#start-new-game-btn");
    if (startNewGameButton) {
      startNewGameButton.addEventListener("click", () => {});
    }
  }

  showStatisticsPopup() {
    const popup = document.createElement("div");
    popup.innerHTML = `
      <div class="popup">
        <h2>Statistics</h2>
        <button id="close-popup-btn">Close</button>
      </div>
    `;

    document.body.appendChild(popup);

    const closePopupButton = popup.querySelector("#close-popup-btn");
    if (closePopupButton) {
      closePopupButton.addEventListener("click", () => {
        document.body.removeChild(popup);
      });
    }
  }

  getHtml() {
    if (this.isLoading) {
      return `
        <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
        ${Spinner()}
        </div>`;
    } else {
      return `
        <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
          <div class="row justify-content-center">
            <h1 class="text-center">META PONG</h1>
            <p class="text-center">  hello <b>${this.username}</b>!</p>
            <h3 class="text-center" id="header">CHOOSE GAME</h3>
            <br/>
            <br/>
            <br/>
            <div class="d-flex justify-content-center gap-5">
            <a href="#">
              ${classicPongComponent()}
            </a>
            <a>
              ${classicPongComponent()}
              </a>
            </div>
          </div>
        </div>`;
    }
  }
}

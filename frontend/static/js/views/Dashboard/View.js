import Spinner from "../../../../components/Spinner.js";
import AbstractView from "../AbstractView.js";
import Home from "../Home.js";
// import Home from "./Home.js";

export default class DashboardView extends AbstractView {
  constructor() {
    super();
    this.startListening();
  }

  startListening() {
    this.initialRender();
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = `
      <audio autoplay loop>
      <source src="assets/lcd.mp3" type="audio/mpeg">
        </audio>
        <div id="content" class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
          <div class="row justify-content-center">
            <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
            <h1>hi ${localStorage.getItem("username")}!</h1>
            <a href="#"><h2>rooms</h2></a>
            <a href="#"><h2>profile</h2></a>
            </div>
          </div>
          </div>    
          <canvas id="three-canvas"></canvas>

          <p>made by @fletcher97, @irifarac & @dbekic</p>
        `;
      this.addEventListeners();
    }
  }
}

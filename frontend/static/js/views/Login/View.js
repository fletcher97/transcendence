import Toast from "../../../../components/Toast.js";
import AbstractView from "../AbstractView.js";
import { GuestLoginView } from "./GuestLoginView.js";
import { drawPongBackground } from "../../../../scripts/drawPongBackground.js";
// import Home from "./Home.js";

export default class LoginView extends AbstractView {
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

    // animatePongBackground();
    if (content) {
      content.innerHTML = `

      <div id="content" class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
        <div class="row justify-content-center">
          <h1 class="hidden text-center">METAPONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          </div>
        </div>
      </div>
        <p>made by @fletcher97, @irifarac & @dbekic</p>
        ${Toast("username already taken", "username-taken-toast", "red")}
        ${Toast("succesfully logged in", "successful-login-toast", "green")}
        `;
      this.addEventListeners();
      drawPongBackground();
    }

    await GuestLoginView(); // Update the content with new HTML
  }
}

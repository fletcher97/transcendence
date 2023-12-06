import Spinner from "../../../../components/spinner.js";
import AbstractView from "../AbstractView.js";
import Home from "../Home.js";
import { GuestLoginView } from "./GuestLoginView.js";
import { SignInView } from "./SignInView.js";
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
        <div id="content" class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
          <div class="row justify-content-center">
            <h1 class="text-center">META PONG</h1>
            <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
            </div>
          </div>
          </div>    
          <p>made by @fletcher97, @irifarac & @dbekic</p>
        `;
      this.addEventListeners();
    }

    await GuestLoginView(); // Update the content with new HTML
  }
}

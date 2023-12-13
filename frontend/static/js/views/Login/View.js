import Toast from "../../../../components/Toast.js";
// import AbstractView from "../AbstractView.js";
import { GuestLoginView } from "./GuestLoginView.js";
import { drawPongBackground } from "../../../../scripts/drawPongBackground.js";
import Spinner from "../../../../components/Spinner.js";
import { SignInView } from "./SignInView.js";
// import Home from "./Home.js";

// export const g_guestLoginViewInstance = new GuestLoginView(callback);

export default class LoginView {
  constructor(switchRoute) {
    // super();
    console.log("switchRoute in loginview: ", switchRoute);
    this.guestLoginViewInstance = new GuestLoginView(
      switchRoute,
      this.render.bind(this)
    );
    this.signInViewInstance = new SignInView(
      switchRoute,
      this.render.bind(this)
    );
    this.initialRender();
    // this.render = this.render.bind(this);
    // this.initialRender = this.initialRender.bind(this);
    // this.signInViewInstance = new SignInView();
  }

  async render(view) {
    console.log("rendering: ", view);
    const loginContainer = document.getElementById("login-container");
    console.log(loginContainer);
    console.log("guest instance: ", this.guestLoginViewInstance);
    if (view === "guestView") {
      loginContainer.innerHTML = Spinner();
      console.log("guest instance: ", this.guestLoginViewInstance);
      const content = await this.guestLoginViewInstance.renderView();
      loginContainer.innerHTML = content;
      this.guestLoginViewInstance.addEventListeners();
    } else if (view === "signInView") {
      loginContainer.innerHTML = Spinner();
      console.log("signInvView instance: ", this.signInViewInstance);
      const content = await this.signInViewInstance.renderView();
      loginContainer.innerHTML = content;
      this.signInViewInstance.addEventListeners();
    }
  }

  async addEventListeners() {
    window.onload = async () => {
      await this.render("guestView");
    };
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    const content = document.getElementById("content");

    // animatePongBackground();
    if (content) {
      content.innerHTML = `

      <div class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
        <div class="row justify-content-center">
          <h1 class="hidden text-center">METAPONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          </div>
        </div>
      </div>
        <p>made by @fletcher97, @irifarac & @dbekic</p>
        ${Toast("username already taken", "username-taken-toast", "red")}
        ${Toast("succesfully logged in", "successful-login-toast", "green")}
        <canvas id="pong-background"></canvas>
        `;
      // this.addEventListeners();
    }
    this.addEventListeners();
    // drawPongBackground();
    // await this.render("guestView");
    // await GuestLoginView(); // Update the content with new HTML
  }
}

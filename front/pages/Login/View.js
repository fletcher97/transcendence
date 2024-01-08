import Toast from "../../../../components/Toast.js";
import { GuestLoginView } from "./GuestLoginView.js";
// import { drawPongBackground } from "../../../../scripts/drawPongBackground.js";
import Spinner from "../../../../components/Spinner.js";
import { SignInView } from "./SignInView.js";
import { accentColor } from "../../../../assets/colors.js";

// export const g_guestLoginViewInstance = new GuestLoginView(callback);

export default class LoginView {
  constructor(switchRoute) {
    // super();
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
    const loginContainer = document.getElementById("login-container");
    if (view === "guestView") {
      loginContainer.innerHTML = Spinner();
      const content = await this.guestLoginViewInstance.renderView();
      loginContainer.innerHTML = content;
      // this.guestLoginViewInstance.addEventListeners();
    } else if (view === "signInView") {
      loginContainer.innerHTML = Spinner();
      const content = await this.signInViewInstance.renderView();
      loginContainer.innerHTML = content;
      // this.signInViewInstance.addEventListeners();
    }
  }

  async addEventListeners() {
    // window.onload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await this.render("guestView");
    // };
    const moonButton = document.getElementById("moon-button");
    moonButton.addEventListener("click", () => {
      document.body.classList.toggle("night-mode");
      // put night mode on h1 too
      const h1 = document.querySelector("h1");
      h1.classList.toggle("night-mode");
    });
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    const content = document.getElementById("content");

    // animatePongBackground();
    if (content) {
      content.innerHTML = `

      <div class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
        <div class="row justify-content-center">
          <h1 class="hidden text-center glow">42-PONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          </div>
        </div>
      </div>
        <b>made by @fletcher97, @irifarac & @dbekic</b>
        ${Toast("username already taken", "username-taken-toast", "red")}
        ${Toast("succesfully logged in", "successful-login-toast", "green")}
        `;
      // this.addEventListeners();
    }
    // moon button that puts night mode class on body
    // <button id="moon-button" class="btn btn-primary">night mode</button>
    // <button id="sun-button" class="btn btn-primary">day mode</button>

    // <canvas id="pong-background"></canvas>
    this.addEventListeners();
    // drawPongBackground();
    // await this.render("guestView");
    // await GuestLoginView(); // Update the content with new HTML
  }
}

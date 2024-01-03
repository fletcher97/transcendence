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
          <h1 class="hidden text-center">METAPONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          </div>
        </div>
      </div>
      <button id="moon-button" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill=${accentColor} class="bi bi-moon-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"/>
    </svg></button>
        <p>made by @fletcher97, @irifarac & @dbekic</p>
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

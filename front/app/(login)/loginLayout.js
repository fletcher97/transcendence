import LoginLayout from "../../../../components/layouts/LoginLayout.js";
import { GuestLoginView } from "./GuestSignIn/GuestLoginView.js";
import Spinner from "../../../../components/Spinner.js";
import { SignInView } from "./SignIn/signInPage.js";
import { accentColor } from "../../../../assets/colors.js";
import { RegisterPage } from "./Register/registerPage.js";

// export const g_guestLoginViewInstance = new GuestLoginView(callback);

export default class LoginView {
  constructor(switchRoute, subPage) {
    this.subPage = subPage;
    console.log("this.subpage: ", this.subPage);
    this.userId = localStorage.getItem('user_id');
    this.me = null;
    this.guestLoginViewInstance = new GuestLoginView(
      switchRoute,
      this.render.bind(this)
    );
    this.signInViewInstance = new SignInView(
      switchRoute,
      this.render.bind(this)
    );
    this.registerPage = new RegisterPage(switchRoute, this.render.bind(this));
    this.initialRender();
    this.render = this.render.bind(this);
  }

  async render(view) {
    const loginContainer = document.getElementById("login-container");
    if (view === "guestView") {
      loginContainer.innerHTML = Spinner();
      const content = await this.guestLoginViewInstance.renderView();
      loginContainer.innerHTML = content;
      // this.guestLoginViewInstance.addEventListeners();
    } else if (view === "/login") {
      loginContainer.innerHTML = Spinner();
      const content = await this.signInViewInstance.renderView();
      loginContainer.innerHTML = content;
      await this.signInViewInstance.addEventListeners();
      // this.signInViewInstance.addEventListeners();
    } else if (view === "/register") {
      loginContainer.innerHTML = Spinner();
      const content = await this.registerPage.renderView();
      loginContainer.innerHTML = content;
      await this.registerPage.addEventListeners();
    }
  }

  async addEventListeners() {
      await new Promise((resolve) => setTimeout(resolve, 50));
      await this.render(this.subPage);
      const hiddenElements = document.querySelectorAll(".hidden");
      let i = 1;
      hiddenElements.forEach((element) => {
        console.log("element: ", element);
        element.classList.add("child" + i);
        i++;
      });
      hiddenElements.forEach((element) => {
        element.classList.add("show");
      });
      document.title = this.subPage.substring(1) + " | 42-pong";
  }

  async initialRender() {
    const content = document.getElementById("app");
    if (content) {
      content.innerHTML = `
      ${LoginLayout()}
        `;
    }
    this.addEventListeners();
  }
}

import Spinner from "../../../../components/Spinner.js";
import registerUser from "../../../../services/api/users/registerUser.js";
import { showMultipleToasts } from "../../../services/client/utils.js";

export class RegisterPage {
  constructor(switchRoute, switchView) {
    this.firstRender = true;
    this.isLoading = true;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
    console.log("is logged in: ", document.cookie.includes("sessionid"));
    console.log("document.cookie: ", document.cookie);
  }

  getHtml = async () => {
    let template = `
      <h4>REGISTER</h4>
      <input class="input-box" type="text" id="register-username" name="username" placeholder="username">
      <input class="input-box" type="text" id="register-email" name="email" placeholder="email">
      <input class="input-box" type="password" id="register-password1" name="username" placeholder="password">
      <input class="input-box" type="password" id="register-password2" name="username" placeholder="confirm password">
        <button id="register-btn" class="btn btn-lg hidden"><span id="play-btn-content">REGISTER</span></button>
        <div class="d-flex gap-2 justify-content-center">
          <p class="blue-p">Already have an account? <a id="sign-in-link" href="#">Sign in</a></p>
        </div>
    `;
    return template;
  };

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    const usernameInput = document.querySelector("#register-username");
    const emailInput = document.querySelector("#register-email");
    const passwordOneInput = document.querySelector("#register-password1");
    const passwordTwoInput = document.querySelector("#register-password2");
    const registerButton = document.querySelector("#register-btn");
    const signInLink = document.querySelector("#sign-in-link");
    registerButton.disabled = true;

    console.log("signinLinnk: ", signInLink);
    signInLink.addEventListener("click", async () => {
      console.log("sign in link clicked");
      this.switchRoute("/login");
    });

    // ** REGISTER CLICK LISTENER ** //
    registerButton.addEventListener("click", async () => {
      localStorage.setItem("username", usernameInput.value);
      const postData = {
        username: usernameInput.value,
        email: emailInput.value,
        password1: passwordOneInput.value,
        password2: passwordTwoInput.value,
      };
      try {
        const response = await registerUser(postData);
        const data = await response.json();
        if (data.error) {
          throw data;
        }
        // store data in local storage
        localStorage.setItem("access_token", data.token_access);
        localStorage.setItem("refresh_token", data.token_refresh);
        localStorage.setItem("user_id", data.id);
        showMultipleToasts(["Register success"], "Success");
        registerButton.innerHTML = Spinner();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.switchRoute("/");
      } catch (error) {
        console.log("error: ", error);
        showMultipleToasts(error.error.password2, "Error");
        usernameInput.value = "";
        emailInput.value = "";
        passwordOneInput.value = "";
        passwordTwoInput.value = "";
      }
    });

    // ** INPUT EVENT LISTENERS ** //
    usernameInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        passwordOneInput.value.trim() !== "" &&
        passwordTwoInput.value.trim() !== ""
      )
        registerButton.disabled = false;
    });
    passwordOneInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        passwordOneInput.value.trim() !== "" &&
        passwordTwoInput.value.trim() !== ""
      )
        registerButton.disabled = false;
    });
    emailInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        passwordOneInput.value.trim() !== "" &&
        passwordTwoInput.value.trim() !== ""
      )
        registerButton.disabled = false;
    });
    passwordTwoInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        emailInput.value.trim() !== "" &&
        passwordOneInput.value.trim() !== "" &&
        passwordTwoInput.value.trim() !== ""
      )
        registerButton.disabled = false;
    });
  };
}

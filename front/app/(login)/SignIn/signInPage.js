import Spinner from "../../../../components/Spinner.js";
import signInUser from "../../../services/api/users/signInUser.js";

export class SignInView {
  constructor(switchRoute, switchView) {
    this.firstRender = true;
    this.isLoading = true;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
  }

  getHtml = async () => {
    return `
      <h4>SIGN IN</h4>
      <input class="input-box" type="text" id="sign-in-username" name="username" placeholder="username"></input>
      <input class="input-box" type="password" id="sign-in-password" name="username" placeholder="password"></input>
          <button id="sign-in-btn" class="btn btn-lg hidden"><span id="play-btn-content">SIGN IN</span></button>
          <p class="blue-p">No account yet? <a id="register-link" href="#">Register</a></p>
    `;
  };

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    const usernameInput = document.querySelector("#sign-in-username");
    const passwordInput = document.querySelector("#sign-in-password");
    const signInButton = document.querySelector("#sign-in-btn");
    const registerLink = document.querySelector("#register-link");

    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.switchRoute("/register");
    });

    signInButton.disabled = true;

    // ** SIGN IN CLICK LISTENER ** //
    signInButton.addEventListener("click", async () => {
      localStorage.setItem("username", usernameInput.value);

      signInButton.disabled = true;
      signInButton.innerHTML = Spinner();
      const postData = {
        username: usernameInput.value,
        password: passwordInput.value,
      };

      try {
        const response = await signInUser(postData);
        const data = await response.json();
        console.log("data received in signInPage.js: ", data);
        if (data.error) {
          throw data.error.__all__;
        }
        localStorage.setItem("access_token", data.token_access);
        localStorage.setItem("refresh_token", data.token_refresh);
        localStorage.setItem("user_id", data.id);
        localStorage.setItem("username", data.username);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.switchRoute("/");
      } catch (error) {
        const toastLiveExample = document.getElementById(
          "username-taken-toast"
        );
        document.querySelector("#toast-message-container").innerHTML = error[0];
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();

        signInButton.innerHTML = "SIGN IN";
        usernameInput.value = "";
        passwordInput.value = "";
      }
    });

    // ** INPUT EVENT LISTENERS ** //
    usernameInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        passwordInput.value.trim() !== ""
      )
        signInButton.disabled = false;
    });
    passwordInput.addEventListener("input", () => {
      if (
        usernameInput.value.trim() !== "" &&
        passwordInput.value.trim() !== ""
      )
        signInButton.disabled = false;
    });
  };
}

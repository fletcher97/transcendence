import Spinner from "../../../../components/Spinner.js";
import signInUser from "../../../services/api/users/signInUser.js";
import { showMultipleToasts } from "../../../services/client/utils.js";

export class SignInView {
  constructor(switchRoute, switchView) {
    this.firstRender = true;
    this.isLoading = true;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
  }

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEmailEventListeners = async () => {
    const usernameInput = document.querySelector("#sign-in-username");
    const passwordInput = document.querySelector("#sign-in-password");
    const signInButton = document.querySelector("#sign-in-btn");
    const emailLoginBtn = document.getElementById("email-login-btn");
    const registerLink = document.querySelector("#register-link");

    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.switchRoute("/register");
    });

    if (signInButton) signInButton.disabled = true;

    // ** SIGN IN CLICK LISTENER ** //
    if (signInButton) {
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
          showMultipleToasts(["Login successful"], "Success");
          localStorage.setItem("access_token", data.token_access);
          localStorage.setItem("refresh_token", data.token_refresh);
          localStorage.setItem("user_id", data.id);
          localStorage.setItem("username", data.username);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          this.switchRoute("/");
        } catch (error) {
          console.log("Error: ", error);
          if (error) {
            showMultipleToasts([error[0]], "Error");
          }

          signInButton.innerHTML = "SIGN IN";
          usernameInput.value = "";
          passwordInput.value = "";
        }
      });
    }

    // ** INPUT EVENT LISTENERS ** //
    if (usernameInput) {
      usernameInput.addEventListener("input", () => {
        if (
          usernameInput.value.trim() !== "" &&
          passwordInput.value.trim() !== ""
        )
          signInButton.disabled = false;
      });
    }
    if (passwordInput) {
      passwordInput.addEventListener("input", () => {
        if (
          usernameInput.value.trim() !== "" &&
          passwordInput.value.trim() !== ""
        )
          signInButton.disabled = false;
      });
    }
  };

  addEventListeners = async () => {
    const emailLoginBtn = document.getElementById("email-login-btn");

    emailLoginBtn.addEventListener("click", async () => {
      const loginContainer = document.getElementById("login-container");
      loginContainer.innerHTML = `
          <input class="input-box" type="text" id="sign-in-username" name="username" placeholder="username"></input>
          <input class="input-box" type="password" id="sign-in-password" name="username" placeholder="password"></input>
          <button id="sign-in-btn" class="btn btn-lg"><span id="play-btn-content">SIGN IN</span></button>
          <p class="blue-p">No account yet? <a id="register-link" href="#">Register</a></p>
      `;
      this.addEmailEventListeners();
    });
  };

  // EMAIL LOGIN

  getHtml = async () => {
    return `
      <h4 class="">SIGN IN</h4>

        <div class="d-flex gap-3">
          <a id="email-login-btn" >
            <div id="log-out-btn" class="btn dark-btn pink-btn">
              <img src="/assets/email.png" height="60" width=""/>
            </div>
          </a>
          <a target="_blank" href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-dbe268104e0d0a1ec1123efbc6b510f5760291dee2b92d44f83056a0a06e00af&redirect_uri=https%3A%2F%2Fwww.google.com&response_type=code">
            <div id="log-out-btn" class="btn dark-btn pink-btn">
              <img src="/assets/42-logo.png" height="60" width=""/>
            </div>
          </a>
        </div>
          

          
    `;
  };
}

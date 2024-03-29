import Spinner from "../../../../components/Spinner.js";
import registerUser from "../../../../services/api/registerUser.js";

export class RegisterPage {
  constructor(switchRoute, switchView) {
    this.firstRender = true;
    this.isLoading = true;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
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
      if (usernameInput.value === "taken") {
        const toastLiveExample = document.getElementById(
          "username-taken-toast"
        );
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
        usernameInput.value = "";
        passwordOneInput.value = "";
        registerButton.disabled = true;
      } else {
        const toastLiveExample = document.getElementById(
          "successful-login-toast"
        );
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
        const postData = {
          username: usernameInput.value,
          email: emailInput.value,
          password1: passwordOneInput.value,
          password2: passwordTwoInput.value,
        }
        await registerUser(postData);
        registerButton.innerHTML = Spinner();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.switchRoute("/");
      }});


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

// const addEventListeners = () => {
//   const usernameInput = document.querySelector("#sign-in-username");
//   const passwordInput = document.querySelector("#sign-in-password");
//   const signInButton = document.querySelector("#sign-in-btn");
//   const returnLink = document.querySelector("#return-link");
//   signInButton.disabled = true;

//   // ** SIGN IN CLICK LISTENER ** //
//   signInButton.addEventListener("click", async () => {
//     localStorage.setItem("username", usernameInput.value);
//     if (usernameInput.value === "taken") {
//       const toastLiveExample = document.getElementById("username-taken-toast");
//       const toastBootstrap =
//         bootstrap.Toast.getOrCreateInstance(toastLiveExample);
//       toastBootstrap.show();
//       usernameInput.value = "";
//       passwordInput.value = "";
//       signInButton.disabled = true;
//     } else {
//       const toastLiveExample = document.getElementById(
//         "successful-login-toast"
//       );
//       const toastBootstrap =
//         bootstrap.Toast.getOrCreateInstance(toastLiveExample);
//       toastBootstrap.show();
//       enterGame("#content");
//     }
//   });

//   // ** INPUT EVENT LISTENERS ** //
//   usernameInput.addEventListener("input", () => {
//     if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "")
//       signInButton.disabled = false;
//   });
//   passwordInput.addEventListener("input", () => {
//     if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "")
//       signInButton.disabled = false;
//   });

//   // ** RETURN CLICK LISTENER ** //
//   returnLink.addEventListener("click", async () => {
//     // ;
//     // const content = await guestLoginViewInstance.getHtml();
//     // document.getElementById("login-container").innerHTML = content;
//   });
// };

// export const SignInView = () => {
//   let content = document.getElementById("login-container");
//   if (content) {
//     content.innerHTML = getHtml();
//     addEventListeners();
//   }
// };

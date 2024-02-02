import Spinner from "../../../../components/Spinner.js";

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

    registerLink.addEventListener("click", () => {
      this.switchRoute("/register");
    });


    signInButton.disabled = true;

    // ** SIGN IN CLICK LISTENER ** //
    signInButton.addEventListener("click", async () => {
      localStorage.setItem("username", usernameInput.value);
      if (usernameInput.value === "taken") {
        const toastLiveExample = document.getElementById(
          "username-taken-toast"
        );
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
        usernameInput.value = "";
        passwordInput.value = "";
        signInButton.disabled = true;
      } else {
        const toastLiveExample = document.getElementById(
          "successful-login-toast"
        );
        const toastBootstrap =
          bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show();
        signInButton.innerHTML = Spinner();
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.switchRoute("/");
      }
    });

    console.log("in add event listerners in signinview");
    // const hiddenElements = document.querySelectorAll(".hidden");
    // let i = 1;
    // hiddenElements.forEach((element) => {
    //   console.log("element: ", element);
    //   element.classList.add("child" + i);
    //   i++;
    // });
    // hiddenElements.forEach((element) => {
    //   element.classList.add("show");
    // });

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

    // ** RETURN CLICK LISTENER ** //
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

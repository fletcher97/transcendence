import { GuestLoginView } from "./GuestLoginView.js";
import { enterGame } from "./enterGame.js";

const getHtml = () => {
  return `
    <h4>SIGN IN</h4>
    <input type="text" id="sign-in-username" name="username" placeholder="username">
    <input type="text" id="sign-in-password" name="username" placeholder="password">
      <div id="btn-container" class="row">
    <button id="sign-in-btn" type="button" class="btn btn-primary btn-lg"><span id="play-btn-content">Sign in</span></button>
    <div class="d-flex gap-2 justify-content-center">
    <p><a id="return-link" href="#"><--</a></p>
  </div>
    
  </div>
  `;
};

const addEventListeners = () => {
  const usernameInput = document.querySelector("#sign-in-username");
  const passwordInput = document.querySelector("#sign-in-password");
  const signInButton = document.querySelector("#sign-in-btn");
  const returnLink = document.querySelector("#return-link");
  signInButton.disabled = true;

  // ** SIGN IN CLICK LISTENER ** //
  signInButton.addEventListener("click", () => {
    console.log(usernameInput.value);
    localStorage.setItem("username", usernameInput.value);
    enterGame("#content");
  });

  // ** INPUT EVENT LISTENERS ** //
  usernameInput.addEventListener("input", () => {
    if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "")
      signInButton.disabled = false;
  });
  passwordInput.addEventListener("input", () => {
    if (usernameInput.value.trim() !== "" && passwordInput.value.trim() !== "")
      signInButton.disabled = false;
  });

  // ** RETURN CLICK LISTENER ** //
  returnLink.addEventListener("click", () => {
    GuestLoginView();
  });
};

export const SignInView = () => {
  let content = document.getElementById("login-container");
  console.log(content);
  if (content) {
    content.innerHTML = getHtml();
    addEventListeners();
  }
};

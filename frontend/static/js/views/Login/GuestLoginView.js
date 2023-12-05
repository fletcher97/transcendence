import { SignInView } from "./SignInView.js";
import { enterGame } from "./enterGame.js";

const getHtml = async () => {
  return `
        <div id="content" class="container d-flex align-items-center justify-content-center" style="height: 95vh;">
        <div class="row justify-content-center">
        <h1 class="text-center">META PONG</h1>
          <div id="login-container" class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
          <h4>PLAY AS GUEST</h4>
            <input type="text" id="username" name="username" placeholder="Enter your username">
            <div id="login-spinner">
              </div>
              <div id="btn-container" class="row">
                <button id="play-btn" type="button" class="btn btn-primary btn-lg"><span id="play-btn-content">PLAY</span></button>
              </div>
              <div class="d-flex gap-2">
                <p><a id="sign-in-link" href="#">sign in</a></p>
                <p> | </p>
                <p><a id="sign-in-link" href="#">register</a></p>
              </div>
              </div>
              <div>
              </div>
              </div>
              </div>
              <p>made by @fletcher97, @irifarac & @dbekic</p>
      </div>    
        `;
};

const addEventListeners = () => {
  let playButton = document.querySelector("#play-btn");
  playButton.disabled = true;
  const usernameInput = document.querySelector("#username");
  usernameInput.addEventListener("input", () => {
    if (document.querySelector("#username").value.trim() !== "") {
      playButton.disabled = false;
    } else {
      playButton.disabled = true;
    }
  });
  playButton.addEventListener("click", () => {
    console.log(usernameInput.value);
    if (usernameInput.value.trim())
      localStorage.setItem("username", usernameInput.value);
    enterGame("#content");
  });

  const signInLink = document.querySelector("#sign-in-link");
  signInLink.addEventListener("click", () => {
    SignInView();
  });
};

export async function GuestLoginView() {
  const content = document.getElementById("content");
  if (content) {
    content.innerHTML = await getHtml(); // Update the content with new HTML
    addEventListeners(); // Add event listeners after updating the content
  }
}

import { SignInView } from "./SignInView.js";
import { enterGame } from "./enterGame.js";

const getHtml = async () => {
  return `

          <h4 class="hidden">PLAY AS GUEST</h4>
            <input class="hidden" type="text" id="username" name="username" placeholder="Enter your username">
              <div id="btn-container" class="row">
                <button id="play-btn" type="button" class="my-btn my-btn-primary btn-lg hidden"><span id="play-btn-content">PLAY</span></button>
              </div>
              <div class="d-flex gap-2 hidden">
                <p><a class="hidden" id="sign-in-link" href="#">sign in</a></p>
                <p> | </p>
                <p><a id="sign-in-link" href="#">register</a></p>
              </div>
              </div>
              <div>
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

  // on DOM load
  window.onload = () => {
    const hiddenElements = document.querySelectorAll(".hidden");
    console.log(hiddenElements);
    let i = 1;
    hiddenElements.forEach((element) => {
      element.classList.add("child" + i);
      i++;
    });
    hiddenElements.forEach((element) => {
      element.classList.add("show");
    });
    i = 1;
    setTimeout(() => {
      console.log("running timeout");
      hiddenElements.forEach((element) => {
        element.classList.remove("child" + i);
        // element.classList.remove("show");
        i++;
      });
    }, 100);
  };
};

export async function GuestLoginView() {
  const content = document.getElementById("login-container");
  if (content) {
    content.innerHTML = await getHtml(); // Update the content with new HTML
    addEventListeners(); // Add event listeners after updating the content
  }
}

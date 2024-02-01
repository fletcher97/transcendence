import Spinner from "../../../../components/Spinner.js";

export class GuestLoginView {
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

  addEventListeners = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // const audio = new Audio("assets/kick.wav");
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
    playButton.addEventListener("click", async () => {
      if (usernameInput.value.trim())
        localStorage.setItem("username", usernameInput.value);
      const audio = new Audio("/assets/kick.mp3");
      audio.play();
      playButton.innerHTML = Spinner();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.switchRoute("/");
    });

    const signInLink = document.querySelector("#sign-in-linkkk");
    signInLink.addEventListener("click", () => {
      // SignInView();
      this.switchView("signInView");
    });

    const registerLink = document.querySelector("#register-link");
    registerLink.addEventListener("click", () => {
      // SignInView();
      this.switchRoute("/register");
    });

    const hiddenElements = document.querySelectorAll(".hidden");
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
      hiddenElements.forEach((element) => {
        // element.classList.remove("hidden");
        // element.classList.remove("child" + i);
        i++;
      });
    }, 100);
    // };
  };

  getHtml = async () => {
    let template = "";
    if (this.firstRender) {
      template = `
      <h4 class="hidden">PLAY AS GUEST</h4>
        <input class="hidden input-box" type="text" id="username" name="username"  placeholder="Enter your username">
            <button id="play-btn" class="btn btn-lg hidden"><span id="play-btn-content">PLAY</span></button>
          <div class="d-flex gap-2 hidden">
            <p><a class="hidden" id="sign-in-linkkk" href="#">sign in</a></p>
            <p> | </p>
            <p><a id="register-link" href="#">register</a></p>
          </div>
          </div>
          <div>
          </div>
    `;
      this.firstRender = false;
    } else {
      template = `
      <h4>PLAY AS GUEST</h4>
        <input type="text" id="username" name="username" class="input-box" placeholder="Enter your username">
          <div id="btn-container" class="row">
            <button id="play-btn" type="button" class="my-btn my-btn-primary btn-lg"><span id="play-btn-content">PLAY</span></button>
          </div>
          <div class="d-flex gap-2">
            <p><a id="sign-in-linkkk" href="#">sign in</a></p>
            <p> | </p>
            <p><a id="register-link" href="#">register</a></p>
          </div>
          </div>
          <div>
          </div>
    `;
    }
    this.addEventListeners();
    return template;
  };
}

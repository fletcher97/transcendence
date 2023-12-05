import Spinner from "../../../components/spinner.js";
import AbstractView from "./AbstractView.js";
import Home from "./Home.js";
// import Home from "./Home.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.startListening();
  }

  async updateUi(id) {
    console.log("updating ui");
    console.log(id);
    const content = document.querySelector("#content");
    console.log(content);
    document.getElementById("login-spinner").style.display = "block";
    document.querySelector("#play-btn-content").innerHTML = Spinner();
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (content) {
      const view = new Home();
      // console.log(view);
      document.querySelector("#content").innerHTML = view.getHtml();
    }
  }

  startListening() {
    console.log("start listening");
    this.render();
  }

  async render() {
    const content = document.getElementById("content");
    if (content) {
      console.log("etneterd");
      content.innerHTML = await this.getHtml(); // Update the content with new HTML
      this.addEventListeners(); // Add event listeners after updating the content
    }
  }

  addEventListeners() {
    document.getElementById("login-spinner").style.display = "none";
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
    // if (playButton) {
    playButton.addEventListener("click", () => {
      console.log(usernameInput.value);
      if (usernameInput.value.trim())
        localStorage.setItem("username", usernameInput.value);
      this.updateUi("#content");
      document.getElementById("login-spinner").style.display = "none";
    });
    // }
  }

  async getHtml() {
    return `
        <div id="content" class="container d-flex align-items-center justify-content-center" style="min-height: 100vh;">
        <div class="row justify-content-center">
          <h1 class="text-center">META PONG</h1>
          <div class="col-md-8 d-flex flex-column justify-content-center gap-2 align-items-center">
            <!-- <h2 class="">lol</h2> -->
            <!-- <label for="username">Username:</label> -->
            <input type="text" id="username" name="username" placeholder="Enter your username">
            <div id="login-spinner">
              </div>
              <div id="btn-container" class="row">
                <button id="play-btn" type="button" class="btn btn-primary btn-lg"><span id="play-btn-content">PLAY</span></button>
              </div>
              <p>already a user? <a href="#">sign in</a></p>
              </div>
              <!-- <div>
              <button type="button" class="btn btn-secondary btn-lg">Meta Pong</button>
            </div> -->
          </div>
          </div>
      </div>    
        `;
  }
}

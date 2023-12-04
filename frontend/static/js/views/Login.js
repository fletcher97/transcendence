import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
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
            <a id="nav-link-about" href="/login" data-link>
              <div class="row">
                <button type="button" class="btn btn-primary btn-lg">PLAY</button>
              </div>
            </a>
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

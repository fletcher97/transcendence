// import AbstractView from "../AbstractView.js";

import DashboardView from "./Dashboard/DashboardView.js";
import Spinner from "../../../../components/Spinner.js";

export default class HomeView {
  constructor(switchRoute) {
    // super();
    this.initialRender();
    this.dashboardViewInstance = new DashboardView(
      switchRoute,
      this.render.bind(this)
    );
  }

  async render(view) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const homeContainer = document.getElementById("home-container");
    if (view === "dashboardView") {
      homeContainer.innerHTML = Spinner();
      const content = await this.dashboardViewInstance.renderView();
      homeContainer.innerHTML = content;
      this.dashboardViewInstance.addEventListeners();
    }
  }

  async addEventListeners() {
    console.log("document ready state", document.readyState);
    // window.onload = async () => {
    // addEventListener("DOMContentLoaded", async (event) => {
    await this.render("dashboardView");
    // });
    // };
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    console.log("yoooooo");
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = `
      <div class="min-vh-100">
        <div class="container row min-vw-100">
          <div class="d-flex align-items-center h-25 p-4">
            <img src="https://i.imgur.com/8QZqZ9t.png" alt="avatar" width="40" height="40"/>
            <p class="ml-1">welcome back, <b>${localStorage.getItem(
              "username"
            )}!</b></p>
          </div>
          <div style="height:50px"></div>
          <div class="container row px-5">
          <div class="container row d-flex align-items-center">
          <div class="d-flex align-items-center">
          <h2 class="btn" style="color: ${"black"}">DASHBOARD</h2>
          <h2 class="mx-5 btn inactive" style="color: ${"black"}">ROOMS</h2>
          <h2 class="mx-5 btn inactive" style="color: ${"black"}">STATS</h2>
          <h2 class="mx-5 btn inactive" style="color: ${"black"}">FRIENDS</h2>
          </div>
          <hr class="w-100 border-2" />
          <div id="home-container"></div> 
          </div>
          
        </div>
          
          `;
      this.addEventListeners();
      // <canvas id="three-canvas"></canvas>
    }
  }
}

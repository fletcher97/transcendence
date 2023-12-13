// import AbstractView from "../AbstractView.js";

import DashboardView from "./Dashboard/DashboardView.js";
import Spinner from "../../../../components/Spinner.js";
import RoomsView from "./Rooms/RoomsView.js";

export default class HomeView {
  constructor(switchRoute) {
    // super();
    this.initialRender();
    this.activeTab = "dashboard-button";
    this.activeTabElement;
    this.switchRoute = switchRoute;
    this.dashboardViewInstance = new DashboardView(
      switchRoute,
      this.render.bind(this)
    );
    this.roomsViewInstance = new RoomsView(switchRoute, this.render.bind(this));
  }

  toggleTab = (button) => {
    if (this.activeTabElement === button) return;
    this.activeTabElement.classList.add("inactive");
    button.classList.remove("inactive");
    this.activeTabElement = button;
  };

  async render(view) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const homeContainer = document.getElementById("home-container");
    if (view === "dashboardView") {
      homeContainer.innerHTML = Spinner();
      const content = await this.dashboardViewInstance.renderView();
      homeContainer.innerHTML = content;
      const dashboardButton = document.querySelector("#dashboard-button");
      if (dashboardButton) {
        console.log("dashboard button: ", dashboardButton);
        this.activeTabElement = document.getElementById(this.activeTab);
        this.toggleTab(document.querySelector("#dashboard-button"));
      }
      this.dashboardViewInstance.addEventListeners();
    } else if (view === "roomsView") {
      homeContainer.innerHTML = Spinner();
      const content = await this.roomsViewInstance.renderView();
      homeContainer.innerHTML = content;
      this.toggleTab(document.querySelector("#rooms-button"));
      this.roomsViewInstance.addEventListeners();
    }
  }

  async addEventListeners() {
    console.log("document ready state", document.readyState);
    const dashboardButton = document.querySelector("#dashboard-button");
    const roomsButton = document.querySelector("#rooms-button");
    const logoutButton = document.querySelector("#log-out-btn");
    // window.onload = async () => {
    // addEventListener("DOMContentLoaded", async (event) => {
    // });
    // };
    await this.render("dashboardView");
    // await new Promise((resolve) => setTimeout(resolve, 200));
    this.activeTabElement = document.getElementById(this.activeTab);
    // Add click event listener
    dashboardButton.addEventListener("click", () => {
      this.toggleTab(dashboardButton);
      this.render("dashboardView");
    });
    roomsButton.addEventListener("click", () => {
      this.toggleTab(roomsButton);
      this.render("roomsView");
    });
    logoutButton.addEventListener("click", () => {
      localStorage.clear();
      this.switchRoute("/login");
    });
  }

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    const content = document.getElementById("content");
    if (content) {
      content.innerHTML = `
      <div class="min-vh-100">
        <div class="container row min-vw-100">
          <div class="d-flex align-items-center h-25 p-4 justify-content-between">
            <div class="d-flex align-items-center">
              <img src="https://i.imgur.com/8QZqZ9t.png" alt="avatar" width="40" height="40"/>
              <p class="ml-1">welcome back, <b>${localStorage.getItem(
                "username"
              )}!</b></p>
              </div>
            <p class="btn active" id="log-out-btn">log out</p>
          </div>
          <div style="height:50px"></div>
          <div class="container row px-5">
          <div class="container row d-flex align-items-center">
          <div class="d-flex align-items-center">
          <h2 id="dashboard-button" class="btn" style="color: ${"black"}">DASHBOARD</h2>
          <h2 id="rooms-button" class="mx-5 btn inactive" style="color: ${"black"}">ROOMS</h2>
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

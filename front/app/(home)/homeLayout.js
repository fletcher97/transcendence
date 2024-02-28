// import AbstractView from "../AbstractView.js";

import DashboardView from "./Dashboard/dashboardPage.js";
import Spinner from "../../../../components/Spinner.js";
import ProfilePage from "./Profile/profilePage.js";
import { accentColor } from "../../../../assets/colors.js";
import logoutUser from "../../services/api/users/logoutUser.js";
import getUser from "../../../services/api/users/getUser.js";
import FriendsPage from "./Friends/friendsPage.js";
// import getUser

export default class HomeView {
  constructor(switchRoute, page) {
    // super();
    this.me = null;
    this.userId = localStorage.getItem("user_id");
    this.initialRender();
    this.page = page;
    this.activeTab = `${page.substring(1)}-button`;
    this.activeTabElement;
    this.switchRoute = switchRoute;
    this.dashboardViewInstance = new DashboardView(
      switchRoute,
      this.render.bind(this)
    );
    this.profilePageInstance = new ProfilePage(
      switchRoute,
      this.render.bind(this)
    );
    this.friendsPageInstance = new FriendsPage(
      switchRoute,
      this.render.bind(this)
    );
    // fetch user data with local storage token_access

    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");

    // // Decode the JWT (this doesn't verify the signature, only decodes the payload)
    // if (accessToken !== undefined) {
    //   console.log("accessToken: ", accessToken);

    //   const decodedToken = atob(accessToken.split(".")[1]);

    //   // Parse the JSON-encoded payload
    //   const payload = JSON.parse(decodedToken);

    //   console.log("payload: ", payload);
    // }

    // Check if the access token is present

    // console.log("me: ", me);
  }

  fetchData = async () => {
    this.me = await getUser(this.userId);
  };

  toggleTab = (button) => {
    console.log("button: ", button);
    // if (this.activeTabElement === button) return;
    console.log("this.activeTab: ", this.activeTab);
    console.log("this.activeTabElement: ", this.activeTabElement);
    this.activeTabElement.classList.add("inactive");
    button.classList.remove("inactive");
    this.activeTabElement = button;
  };

  async render(view) {
    console.log("view: ", view);
    this.activeTabElement = document.getElementById(this.activeTab);
    this.toggleTab(document.querySelector(`#${view}-button`));
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (view === this.activeTab.toLowerCase()) {
      // View is already active, no need to re-render
      return;
    }
    const homeContainer = document.getElementById("home-container");
    if (view === "dashboard") {
      homeContainer.innerHTML = Spinner();
      const content = await this.dashboardViewInstance.renderView();
      homeContainer.innerHTML = content;
      const dashboardButton = document.querySelector("#dashboard-button");
      if (dashboardButton) {
        this.activeTabElement = document.getElementById(this.activeTab);
        // this.toggleTab(document.querySelector("#dashboard-button"));
      }
      this.dashboardViewInstance.addEventListeners();
    } else if (view === "profile") {
      // this.toggleTab(document.querySelector("#profile-button"));
      homeContainer.innerHTML = Spinner();
      const content = await this.profilePageInstance.renderView();
      homeContainer.innerHTML = content;
      this.profilePageInstance.addEventListeners();
    } else if (view === "friends") {
      // this.toggleTab(document.querySelector("#friends-button"));
      homeContainer.innerHTML = Spinner();
      const content = await this.friendsPageInstance.renderView();
      homeContainer.innerHTML = content;
      this.friendsPageInstance.addEventListeners();
    }
  }

  async addEventListeners() {
    console.log("document ready state", document.readyState);
    const dashboardButton = document.querySelector("#dashboard-button");
    const friendsbutton = document.querySelector("#friends-button");
    const profileButton = document.querySelector("#profile-button");
    const logoutButton = document.querySelector("#log-out-btn");
    // window.onload = async () => {
    // addEventListener("DOMContentLoaded", async (event) => {
    // });
    // };

    // await new Promise((resolve) => setTimeout(resolve, 200));
    this.activeTabElement = document.getElementById(this.activeTab);
    // Add click event listener
    dashboardButton.addEventListener("click", () => {
      this.toggleTab(dashboardButton);
      const route = "/dashboard";
      // history.pushState({ route }, null, route);
      // this.render("dashboard");
      this.switchRoute("/dashboard");
    });
    friendsbutton.addEventListener("click", () => {
      this.toggleTab(friendsbutton);
      // const route = "/friends";
      // history.pushState({ route }, null, route);
      this.switchRoute("/friends");
      // this.render("friends");
    });
    profileButton.addEventListener("click", () => {
      this.toggleTab(profileButton);
      // push state to route == "/profile"
      const route = "/profile";
      this.switchRoute("/profile");
      // history.pushState({ route }, null, route);
      // this.render("profile");
    });
    logoutButton.addEventListener("click", () => {
      try {
        logoutUser();
        localStorage.clear();
        // history.replaceState(null, "", "/");
        this.switchRoute("/login");
      } catch (error) {
        console.error("Error logging out user:", error.message);
      }
    });
  }

  //   <audio controls autoplay style="display:none">
  //   <source src="/assets/lcd.mp3" type="audio/mp3">
  //   Your browser does not support the audio element.
  // </audio>

  async initialRender() {
    // RENDER DIFFERENT VIEWS DEPENDING ON THINGS?
    await this.fetchData();
    console.log("initial render");
    const content = document.getElementById("app");
    if (content) {
      content.innerHTML = `
      <div class="min-vh-100">
        <div class="container row min-vw-100">
          <div class="d-flex align-items-center h-25 p-4 justify-content-between">
            <div class="d-flex align-items-center">
            <div class="border rounded-circle border-secondary border-2 style="border-radius: 50%;overflow: hidden">
                <img src="${
                  "data:image/png;base64," + this.me.profile_image_base64
                }" alt="avatar" width="40" height="40" style="object-fit:cover"/>
              </div>
              <p class="ml-1">welcome back, <b>${this.me.username}!</b></p>
              </div>
            
          <div class="d-flex align-items-center">
          <b><h2 id="dashboard-button" class="nav-item inactive">DASHBOARD</h2></b>
          <b><h2 id="friends-button" class="mx-2 inactive nav-item">FRIENDS</h2></b>
          <b><h2 id="profile-button" class="mx-2 inactive nav-item">MY PROFILE</h2></b>
          <p class="btn active" id="log-out-btn">log out</p>
          </div>
          </div>  
          <div style="height:50px"></div>
          <div class="container row px-5">
          <div class="container row d-flex align-items-center">
          
          <hr class="w-100 border-2" />
          <div id="home-container"></div> 
          </div>
        </div>
          
          `;
      await this.render(this.page.substring(1));
      this.addEventListeners();
      // <canvas id="three-canvas"></canvas>
    }
  }
}

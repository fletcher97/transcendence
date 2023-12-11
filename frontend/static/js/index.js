import DashboardView from "./views/Dashboard/View.js";
// import Home from "./views/Home.js";
import LoginView from "./views/Login/View.js";

const initApp = () => {
  // ** IF USER IS LOGGED IN GO DIRECTLY TO DASHBOARD **
  let userId = "1234";
  if (userId === "123") {
    console.log("User is logged in. User ID:", userId);
    new DashboardView();
  } else {
    console.log("User is not logged in. User ID:", userId);
    new LoginView();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

initApp();

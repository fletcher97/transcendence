import HomeView from "./views/Home/View.js";
import LoginView from "./views/Login/View.js";

const switchRoute = (route) => {
  console.log("switching route to: ", route);
  if (route === "/home") {
    new HomeView(switchRoute);
  } else if (route === "/login") {
    new LoginView(switchRoute);
  }
};

const initApp = () => {
  // ** IF USER IS LOGGED IN GO DIRECTLY TO DASHBOARD **
  let userId = "124";
  if (userId === "123") {
    console.log("User is logged in. User ID:", userId);
    switchRoute("/home");
    // new DashboardView();
  } else {
    console.log("User is not logged in. User ID:", userId);
    switchRoute("/login");
    // new LoginView(switchRoute);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

initApp();

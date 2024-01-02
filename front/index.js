import HomeView from "./pages/Home/View.js";
import LoginView from "./pages/Login/View.js";

const switchRoute = (route) => {
  console.log("switching route to: ", route);

  if (window.location.pathname === "/login") {
    history.replaceState(null, "", "/");
  } else {
    history.pushState({ route }, null, route);
  }
  if (route === "/") {
    new HomeView(switchRoute);
  } else if (route === "/login") {
    if (history.state.route !== "/") {
      new LoginView(switchRoute);
    }
  }
};

window.onpopstate = (event) => {
  console.log("event: ", event);
  const route = event.state ? event.state.route : window.location.pathname;

  if (window.location.pathname !== "/login") {
    switchRoute(route);
  }
};

const initApp = () => {
  // ** IF USER IS LOGGED IN GO DIRECTLY TO DASHBOARD **
  let userId = "123";
  if (userId === "123") {
    console.log("User is logged in. User ID:", userId);
    switchRoute("/");
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

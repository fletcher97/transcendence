import GameView from "./pages/Game/View.js";
import HomeView from "./pages/Home/View.js";
import LoginView from "./pages/Login/View.js";
import DEV_ENV from "./config.js";

let room = { name: "myRoom" };

const switchRoute = (route) => {
  console.log("switching route to: ", route);

  if (window.location.pathname === "/login") {
    history.replaceState(null, "", "/");
  } else {
    history.pushState({ route }, null, route);
  }
  if (route === "/") {
    new HomeView(switchRoute, room);
  } else if (route === "/login") {
    if (history.state.route !== "/") {
      new LoginView(switchRoute);
    }
  } else if (route === "/game") {
    if (history.state.route !== "/") {
      new GameView(switchRoute, room);
    }
  }
};

window.onpopstate = (event) => {
  console.log("event: ", event);
  const route = event.state ? event.state.route : window.location.pathname;

  // if (window.location.pathname !== "/login") {
  switchRoute(route);
  // }
};

const initApp = () => {
  // ** IF USER IS LOGGED IN GO DIRECTLY TO DASHBOARD **
  const id = DEV_ENV.USER_EXAMPLE.id;
  if (id === "123") {
    console.log("User is logged in. User ID:", id);
    switchRoute("/");
    // new DashboardView();
  } else if (id === "12345") {
    switchRoute("/game");
  } else {
    console.log("User is not logged in. User ID:", id);
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

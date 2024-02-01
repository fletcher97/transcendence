import GameView from "./app/(game)/layout.js";
import HomeView from "./app/(home)/View.js";
import LoginView from "./app/(login)/layout.js";
import DEV_ENV from "./config.js";

let room = { name: "myRoom" };

const switchRoute = (route) => {
  console.log("switching route to: ", route);

  if (window.location.pathname === "/login") {
    history.replaceState(null, "", "/");
  } else {
    history.pushState({ route }, null, route);
  }
  if (route === "/" || route === "/dashboard") {
    new HomeView(switchRoute, room);
  } else if (route === "/login" || route === "/register") {
    // if (history.state.route !== "/") {
    new LoginView(switchRoute, route);
    // }
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
  var url = new URL(window.location.href);
  console.log("url: ", url);
  const id = DEV_ENV.USER_EXAMPLE.id;
  if (url.pathname === "/" && id !== "123") switchRoute(url.pathname);
  else {
    switchRoute("/login");
  }
  // ** IF USER IS LOGGED IN GO DIRECTLY TO DASHBOARD **
  // if (id === "123") {
  //   console.log("User is logged in. User ID:", id);
  //   switchRoute("/");
  //   // new DashboardView();
  // } else if (id === "12345") {
  //   switchRoute("/game");
  // } else {
  //   console.log("User is not logged in. User ID:", id);
  //   switchRoute("/login");
  //   // new LoginView(switchRoute);
  // }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

initApp();

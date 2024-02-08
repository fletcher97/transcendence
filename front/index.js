import GameView from "./app/(game)/gameLayout.js";
import HomeView from "./app/(home)/homeLayout.js";
import LoginView from "./app/(login)/loginLayout.js";
import DEV_ENV from "./config.js";
import Toast from "./components/Toast.js";

const room = {name: "lol"}

const switchRoute = (route) => {
  console.log("switching route to: ", route);
  // get session id from cookies
  // const sessionId = document.cookie.split("=")[1];
  // console.log("access Token: ", accessToken);
  // if (!accessToken) {
  //   new LoginView(switchRoute, route);
  //   history.pushState({ route }, null, route);
  //   return;
  // }

  if (route === "/" || route === "/dashboard" || route == "/friends" || route == "/profile") {
    if (route === "/")
    route = "/dashboard"
    history.pushState({ route }, null, route);
    new HomeView(switchRoute, route);
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
  const route = event.state ? event.state.route : window.location.pathname;
  switchRoute(route);
};

const initApp = () => {
  var url = new URL(window.location.href);
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  console.log("accessToken: ", accessToken);
  console.log("userId: ", userId);

  if (accessToken) {
    if (url.pathname !== "/login" && url.pathname !== "/register") {
      switchRoute(url.pathname);
    } else {
      switchRoute("/");
    }
  } else {
    switchRoute("/login");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

initApp();

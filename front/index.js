import GameView from "./app/(game)/gameLayout.js";
import HomeView from "./app/(home)/homeLayout.js";
import LoginView from "./app/(login)/loginLayout.js";
import DEV_ENV from "./config.js";
import Toast from "./components/Toast.js";

let room = { name: "myRoom" };

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

  history.pushState({ route }, null, route);
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
  const route = event.state ? event.state.route : window.location.pathname;
  switchRoute(route);
};

const initApp = () => {
  // add to app div container
  var url = new URL(window.location.href);
  console.log("url: ", url);
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

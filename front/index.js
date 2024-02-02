import GameView from "./app/(game)/gameLayout.js";
import HomeView from "./app/(home)/homeLayout.js";
import LoginView from "./app/(login)/loginLayout.js";
import DEV_ENV from "./config.js";
import Toast from "./components/Toast.js";

let room = { name: "myRoom" };

const switchRoute = (route) => {
  console.log("switching route to: ", route);
  console

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
  // console.log("event: ", event);
  // window.alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
  const route = event.state ? event.state.route : window.location.pathname;
  switchRoute(route);
};

const initApp = () => {
  // add to app div container
  var url = new URL(window.location.href);
  console.log("url: ", url);
  const id = DEV_ENV.USER_EXAMPLE.id;
  if (id !== "123") {
    switchRoute(url.pathname);
  }
  else {
    switchRoute("/login");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

initApp();

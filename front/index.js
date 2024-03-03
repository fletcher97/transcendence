import GameView from "./app/(game)/gameLayout.js";
import HomeView from "./app/(home)/homeLayout.js";
import LoginView from "./app/(login)/loginLayout.js";
import LocalPongPage from "./app/(game)/localPong.js/localPongPage.js";
import MetaPongPage from "./app/(game)/metaPong.js/metaPong.js";

const parseJWTToken = async () => {
  // Decode the JWT (this doesn't verify the signature, only decodes the payload)
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    console.log("accessToken: ", accessToken);
    const decodedToken = atob(accessToken.split(".")[1]);
    // Parse the JSON-encoded payload
    const payload = JSON.parse(decodedToken);
    console.log("payload: ", payload);
    // check if experied
    const exp = payload.exp;
    const now = Date.now() / 1000;
    console.log("exp: ", exp);
    console.log("now: ", now);
    return payload;
    if (exp < now) {
      console.log("token expired");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_id");
      return false;
    }
  }
};

const checkAuth = async () => {
  // Replace 'your-api-endpoint' with the actual endpoint URL
  const apiUrl = "https://localhost:443/api/user/get_is_auth/";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      // Add any other options if needed (e.g., mode, credentials, etc.)
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }

    const data = await response.json();
    console.log(data);
    console.log("returning");
    return data;
  } catch (error) {
    // Handle errors during the fetch
    console.error("Error during fetch:", error.message);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

export const switchRoute = (route, popstate = false) => {
  console.log("popstate: ", popstate);
  console.log("switching route to: ", route);
  // get session id from cookies
  // const sessionId = document.cookie.split("=")[1];
  // console.log("access Token: ", accessToken);
  // if (!accessToken) {
  //   new LoginView(switchRoute, route);
  //   history.pushState({ route }, null, route);
  //   return;
  // }
  const app = document.getElementById("app");
  // app.innerHTML = "";

  if (
    route === "/" ||
    route === "/dashboard" ||
    route == "/friends" ||
    route == "/profile"
  ) {
    if (route === "/") {
      route = "/dashboard";
    }
    new HomeView(switchRoute, route);
  } else if (route === "/login" || route === "/register") {
    // if (history.state.route !== "/") {
    new LoginView(switchRoute, route);
    // }
  } else if (route === "/game") {
    if (history.state.route !== "/") {
      new GameView(switchRoute, room);
    }
  } else if (route === "/game/local-pong") {
    new LocalPongPage(switchRoute);
  } else if (route === "/game/meta-pong") {
    new MetaPongPage(switchRoute);
  }
  if (!popstate) {
    console.log(`pushing ${route} to history`);
    history.pushState({ route }, "null", route);
  }
};

window.onpopstate = (event) => {
  const route = event.state ? event.state.route : window.location.pathname;
  console.log("route in onpopstate: ", route);
  switchRoute(route, true);
};

const initApp = async () => {
  var url = new URL(window.location.href);
  console.log("url: ", url.pathname);
  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  const authResponse = await checkAuth();
  const jwtToken = await parseJWTToken();
  console.log("jwtToken: ", jwtToken);
  const sessionStatus = authResponse.status.toLowerCase();
  console.log("sessionStatus: ", sessionStatus);

  if (
    sessionStatus === "online"
    // (jwtToken && jwtToken.exp > Date.now() / 1000)
  ) {
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
    // e.preventDefault();
  });
});

initApp();

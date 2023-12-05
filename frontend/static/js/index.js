import Home from "./views/Home.js";
import Login from "./views/Login.js";
import ChooseGame from "./views/ChooseGame.js";

const navigateTo = (url) => {
  history.pushState(null, null, "/");
  router();
};

export async function switchView(view) {
  const views = [
  { path: "/", view: Home },
  { path: "login", view: Login },
  { path: "chooseGame", view: ChooseGame },
  ];

  // find correct view based on view input string
  const targetView = views.find((viewInput) => viewInput.path === view);
  console.log(targetView);
  view = new targetView.view();
  console.log(view);
  document.querySelector("#content").innerHTML = await view.getHtml();

}


const router = async () => {
  const views = [
    { path: "/", view: Home },
    { path: "login", view: Login },
    { path: "chooseGame", view: ChooseGame },
    // { path: "/about", view: () => console.log("Viewing About") },
    // { path: "/statistics", view: () => console.log("Viewing Statistic") },
  ];

  // Example of programmatically switching to the login route
  // You can call this function wherever you need to switch views
  let userId = "1234";
  if (userId === "123") {
    console.log("User is logged in. User ID:", userId);
    const view = new views[0].view();
    // view.getHtml();
  } else {
    console.log("User is not logged in. User ID:", userId);
    const view = new views[1].view();
    // await view.getHtml();
  }
};

window.addEventListener("popstate", router);

// Function to programmatically switch routes
// const switchRoute = (path) => {
//   navigateTo(path);
// };

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // if (e.target.matches("[data-link]")) {
    e.preventDefault();
    // navigateTo(e.target.href);
    // }
  });

  router();
});


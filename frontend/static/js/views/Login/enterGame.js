import Spinner from "../../../../components/Spinner.js";
import DashboardView from "../Dashboard/View.js";

export const enterGame = async (id) => {
  const content = document.querySelector("#content");
  document.querySelector("#play-btn-content").innerHTML = Spinner();
  const canvas = document.querySelector("#pong-background");
  const parentElement = document.getElementById("body");

  // Remove the canvas from its parent node
  parentElement.removeChild(canvas);

  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (content) {
    const view = new DashboardView();
    view.getHtml();
  }
};

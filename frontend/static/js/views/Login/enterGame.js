import Spinner from "../../../../components/spinner.js";
import Home from "../Home.js";

export const enterGame = async (id) => {
  const content = document.querySelector("#content");
  document.querySelector("#play-btn-content").innerHTML = Spinner();

  await new Promise((resolve) => setTimeout(resolve, 300));
  if (content) {
    const view = new Home();
    document.querySelector("#content").innerHTML = view.getHtml();
  }
};

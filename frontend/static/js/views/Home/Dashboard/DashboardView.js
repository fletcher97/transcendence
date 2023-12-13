import Spinner from "../../../../../components/Spinner.js";
// import AbstractView from "../../AbstractView.js";
import Home from "../../Home.js";
import {
  primaryColor,
  backgroundAccentColor,
} from "../../../../../assets/colors.js";
// import Home from "./Home.js";

export default class DashboardView {
  constructor() {
    // super();
  }

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {};

  getHtml = async () => {
    return `<div class="d-flex gap-5">
    <div class="text-center">
      <h1 style="font-size:42px">19</h1>
      <p>PLAYERS ONLINE</p>
    </div>
    <div class="vr"></div>
    <div class="text-center">
    <h1 style="font-size:42px">2</h1>
    <p>ACTIVE ROOMS</p>
    </div>
    <div class="vr"></div>
    <div class="text-center">
      <h1 style="font-size:42px">4</h1>
      <p>FRIENDS ONLINE</p>
    </div>
  </div>
  <div style="height:40px"></div>
  <div class="d-flex justify-content-between">
    <div class="card row justify-content-between" style="height: 25rem;background-color: ${backgroundAccentColor};width:25%">
        <div class="row">
          <h1 style="font-size: 42px" class="card-title">ROOMS</h1>
        </div>
          <h2 href="#" class="btn text-right">SEE ALL</h2>
    </div>
    <div class="card" style="height: 25rem;background-color: ${backgroundAccentColor};width:25%"></div>
    <div class="card" style="height: 25rem;background-color: ${backgroundAccentColor};width:25%"></div>
  </div>
  </div>`;
  };
}

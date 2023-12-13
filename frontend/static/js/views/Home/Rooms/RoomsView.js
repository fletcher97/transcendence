import Spinner from "../../../../../components/Spinner.js";
// import AbstractView from "../../AbstractView.js";
import Home from "../../Home.js";
import {
  primaryColor,
  backgroundAccentColor,
} from "../../../../../assets/colors.js";
import { DashboardRoomBox } from "/components/DashboardRoomBox.js";
// import Home from "./Home.js";

export default class RoomsView {
  constructor(switchRoute, switchView) {
    this.switchRoute = switchRoute;
    this.switchView = switchView;
    this.rooms = [
      { roomName: "room1", numPlayers: 2, game: "classic pong" },
      { roomName: "room2", numPlayers: 3, game: "meta pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
      { roomName: "room3", numPlayers: 4, game: "classic pong" },
    ];
  }

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {};

  getHtml = async () => {
    return `<div class="d-flex gap-5">

    <div style="height:40px"></div>
    <div class="d-flex justify-content-between">
    <div class="row justify-content-between" style="width:100%">
    <h1 style="font-size: 42px" class="">ROOMS</h1>
        <div class="row" style="background-color: ${backgroundAccentColor}">
          ${this.rooms.map((room) => DashboardRoomBox({ room: room })).join("")}
        </div>
      <p class="btn active" style="font-size: 26px">CREATE NEW ROOM</p>
      </div>
    </div>
    </div>`;
  };
}

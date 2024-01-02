import { backgroundAccentColor } from "../../../../../assets/colors.js";
import { DashboardRoomBox } from "../../../../../components/DashboardRoomBox.js";

export default class DashboardView {
  constructor(switchRoute, switchView) {
    this.switchRoute = switchRoute;
    this.switchView = switchView;
    this.rooms = [
      { name: "room1", numPlayers: 2, game: "classic pong" },
      { name: "room2", numPlayers: 3, game: "meta pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
      { name: "room3", numPlayers: 4, game: "classic pong" },
    ];
  }

  renderView = async () => {
    // this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    // const roomsSeeAllBtn = document.getElementById("rooms-see-all-btn");
    // roomsSeeAllBtn.addEventListener("click", () => {
    //   this.switchView("roomsView");
    // });
  };

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
    <div class="d-flex gap-5 rooms-container">

    <div style="height:40px"></div>
    <div class="d-flex justify-content-between">
    <div class="row justify-content-between" style="width:100%">
    <h1 style="font-size: 42px" class="py-3">PLAY</h1>
      <div class="d-flex">
        <p>players</p>
      </div>
        <div class="row rooms-rows-container">
          ${this.rooms.map((room) => DashboardRoomBox({ room: room })).join("")}
        </div>
      <p class="btn active" style="font-size: 26px">CREATE NEW ROOM</p>
      </div>
    </div>
    </div>`;
  };
}

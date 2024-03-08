import { DashboardRoomBox } from "../../../../../components/DashboardRoomBox.js";
import getUser from "../../../services/api/users/getUser.js";
import { fetchData } from "./fetchData.js";

export default class DashboardView {
  constructor(switchRoute, switchView) {
    this.userId = localStorage.getItem("user_id");
    this.me = null;
    this.switchRoute = switchRoute;
    this.switchView = switchView;
  }

  renderView = async () => {
    console.log("fetched data in dashboard: ", await fetchData());
    this.me = await getUser(this.userId);
    console.log("this.me: ", this.me);
    // history.pushState({ route: "/dashboard" }, null, "/dashboard");
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    const localPongButton = document.querySelector("#play-local-pong-btn");
    const metaPongButton = document.querySelector("#play-meta-pong-btn");
    const multiplayerButton = document.querySelector("#play-multiplayer-btn");
    const localTournamentButton = document.querySelector(
      "#play-local-tournament-btn"
    );

    this.activeTabElement = document.getElementById(this.activeTab);
    // Add click event listener
    if (localPongButton) {
      localPongButton.addEventListener("click", () => {
        this.switchRoute("/game/local-pong");
      });
    }
    if (metaPongButton) {
      metaPongButton.addEventListener("click", () => {
        this.switchRoute("/game/meta-pong");
      });
    }

    if (localTournamentButton) {
      localTournamentButton.addEventListener("click", () => {
        this.switchRoute("/game/local-tournament");
      });
    }

    if (multiplayerButton) {
      multiplayerButton.addEventListener("click", () => {
        this.switchRoute("/multiplayer");
      });
    }

    // const form = document.getElementById("createGameForm");
    // // Show the modal event listener
    // const submitButton = form.querySelector('button[type="submit"]');
    // submitButton.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   console.log("input: ", event.target.value);
    //   // Your custom logic for handling the form submission
    //   // For example, you can retrieve the input value and perform an action
    //   const gameName = document.getElementById("game-name").value;
    //   console.log("Game Name:", gameName);
    //   this.room = { name: gameName };

    //   const modal = document.getElementById("createGameModal");
    //   if (modal) {
    //     modal.classList.remove("show");
    //     modal.setAttribute("aria-hidden", "true");
    //     modal.setAttribute("style", "display: none");
    //     document.body.classList.remove("modal-open");
    //     const modalBackdrop = document.querySelector(".modal-backdrop");
    //     if (modalBackdrop) {
    //       modalBackdrop.parentNode.removeChild(modalBackdrop);
    //     }
    //   }
    //   this.switchRoute("/game", this.room);

    //   // Close the modal if needed
    //   // modal.hide();
    // });
  };

  // createGameModal = () => {
  //   return `
  //   <div class="modal fade" id="createGameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  //     <div class="modal-dialog modal-dialog-centered" role="document">
  //       <div class="modal-content" >
  //         <div class="modal-container modal-body">
  //         <form id="createGameForm">
  //         <div class="modal-header">
  //           <h5 class="modal-title" id="editProfileModalLabel">Create New Game</h5>
  //           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //         </div>

  //         <div class="modal-body">
  //           <div class="mb-3">
  //             <label for="game-name" class="col-form-label">Name:</label>
  //             <input type="text" class="form-control input-box" id="game-name" value="">
  //           </div>
  //         </div>

  //         <div class="modal-footer">
  //           <button id="submit-btn" type="submit" class="btn  dark-btn">Create Game</button>
  //         </div>
  //       </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>`;
  // };

  // getHtml = async () => {
  //   return `
  //   ${this.createGameModal()}
  //   <div class="d-flex justify-content-between gap-4 align-items-center w-100">
  //     <h1 style="font-size: 42px" class="glow">PLAY</h1>
  //     <img src="../../../assets/rooms-icon.svg" />
  //   </div>
  //   <div class="d-flex row gap-5 rooms-container p-4">
  //     <div class="d-flex m-0 p-0">
  //       <div class="row justify-content-between gap-1" style="">

  //         <div class="d-flex justify-content-between">
  //         </div>
  //         <div class="container">
  //           <div class="row px-4">
  //             <div class="col-2">
  //               <b>players</b>
  //             </div>
  //             <div class="col-2">
  //               <b>name</b>
  //             </div>
  //             <div class="col-2">
  //               <b>game</b>
  //             </div>
  //             <div class="col-2">
  //               <b>placeholder</b>
  //             </div>
  //             <div class="col-4"/>
  //           </div>
  //         </div>

  //           <div class="row rooms-rows-container m-0 mt-2 ">
  //           ${this.rooms
  //             .map((room) => DashboardRoomBox({ room: room }))
  //             .join("")}
  //             </div>
  //           </div>

  //           <div class="mt-auto">
  //             <button class="btn btn-sm m-0 dark-btn" data-bs-toggle="modal" data-bs-target="#createGameModal">CREATE GAME</button>
  //           </div>
  //       </div>
  //     </div>
  //   </div>`;
  // };
  getHtml = async () => {
    return `
    <div class="d-flex justify-content-center align-items-center gap-4 w-100 mh-100" style="min-height:78vh;">
      <div class="row align-items-center justify-content-between gap-4">
        <div class="justify-content-center d-flex">
          <button class="btn dark-btn pink-btn" id="play-local-pong-btn">LOCAL PONG</button>
        </div>
        <div class="justify-content-center d-flex">
        <button class="btn dark-btn pink-btn" id="play-multiplayer-btn">MULTIPLAYER</button>
        </div>
        <div class="justify-content-center d-flex">
        <button class="btn dark-btn pink-btn" id="play-local-tournament-btn">LOCAL TOURNAMENT</button>
        </div>
        <div class="justify-content-center d-flex">
          <button class="btn meta-pong-btn" id="play-meta-pong-btn">3D PONG</button>
        </div>
      </div>
    </div>`;
  };
}

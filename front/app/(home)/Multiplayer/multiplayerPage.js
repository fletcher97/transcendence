import getUser from "../../../services/api/users/getUser.js";
import getRooms from "../../../services/api/rooms/getRooms.js";
import { FriendBox } from "../../../components/FriendBox.js";
import { DashboardRoomBox } from "../../../components/DashboardRoomBox.js";
import createRoom from "../../../services/api/rooms/createRoom.js";

export default class MultiplayerPage {
  constructor(switchRoute, switchView) {
    this.userId = localStorage.getItem("user_id");
    this.me = null;
    this.rooms;
    this.friendRequests = [];
    this.switchRoute = switchRoute;
    this.switchView = switchView;
    this.fetchData();
  }

  fetchData = async () => {
    this.me = await getUser(this.userId);
    const rooms = await getRooms();
    this.rooms = rooms.rooms;
    this.rooms.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });
    console.log("this.rooms: ", this.rooms);
  };

  renderView = async () => {
    await this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  createGameModal = () => {
    return `
    <div class="modal fade" id="createGameModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" >
          <div class="modal-container modal-body">
          <form id="createGameForm">
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalLabel">Create New Game</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="game-name" class="col-form-label">Name:</label>
              <input type="text" class="form-control input-box" id="game-name" value="">
            </div>
          </div>

          <div class="modal-footer">
            <button id="submit-btn" type="submit" class="btn  dark-btn">Create Game</button>
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>`;
  };

  addEventListeners = async () => {
    const form = document.getElementById("createGameForm");
    // Show the modal event listener
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().replace(/\.\d{3}Z$/, ""); // Remove milliseconds and 'Z' from the end

      console.log("input: ", event.target.value);
      // Your custom logic for handling the form submission
      // For example, you can retrieve the input value and perform an action
      const gameName = document.getElementById("game-name").value;
      const postData = {
        name: gameName,
        player1: this.userId,
        time: formattedDate,
      };

      const response = await createRoom(postData);
      const createdRoom = await response.json();
      console.log("createdRoom: ", createdRoom);

      const modal = document.getElementById("createGameModal");
      if (modal) {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        modal.setAttribute("style", "display: none");
        document.body.classList.remove("modal-open");
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
          modalBackdrop.parentNode.removeChild(modalBackdrop);
        }
      }
      this.switchRoute(`/rooms/${createdRoom.id}`);

      // Close the modal if needed
      // modal.hide();
    });
  };

  getHtml = async () => {
    return `
    ${this.createGameModal()}
    <div class="container d-flex align-items-center justify-content-center vh-75">
                <div>
                    <div class="mt-auto">
                        <button class="btn dark-btn pink-btn" data-bs-toggle="modal" data-bs-target="#createGameModal">CREATE GAME</button>
                    </div>
                    <div class="row m-0 mt-2">
                        ${this.rooms
                          .map((room) => DashboardRoomBox(room))
                          .join("")}
                    </div>
                </div>
            </div>
    `;
  };
}

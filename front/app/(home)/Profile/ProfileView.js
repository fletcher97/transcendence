import { backgroundAccentColor } from "../../../../../assets/colors.js";
import { DashboardRoomBox } from "/components/DashboardRoomBox.js";

export default class ProfileView {
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

  addEventListeners = async () => {};

  editProfileModal = () => {
    return `
    <div class="modal fade modal-container" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="background-color:#49627C">
          <div class="modal-body">
          <form>
          <div class="modal-header">
            <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="username" class="col-form-label">Username:</label>
              <input type="text" class="form-control" id="username" value="username">
            </div>
            <div class="mb-3">
              <label for="email" class="col-form-label">Email:</label>
              <input type="text" class="form-control" id="email" value="email">
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="col-form-label">Confirm Password:</label>
              <input type="text" class="form-control" id="confirmPassword" value="confirmPassword">
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <input type="submit" class="btn btn-primary" value="Save Changes">
          </div>
        </form>
          </div>
        </div>
      </div>
    </div>`;
  };

  getHtml = async () => {
    return `
    ${this.editProfileModal()}
    <div style="height:20px"></div>
      <div class="d-flex gap-5">
        <div class="row justify-content-between gap-4" style="width:30%">
          <div class="d-flex align-items-center gap-4">  
            <div class="border rounded-circle border-primary border-3 style="border-radius: 50%;overflow: hidden">
              <img src="https://robohash.org/mail@ashallendesign.co.uk" alt="avatar" width="100" height="100" style="object-fit:cover"/>
            </div>
            <h1 style="font-size: 42px" class="">${localStorage.getItem(
              "username"
            )}
            </h1>
          </div>
          <div class="row justify-content-between">
            <div>
              <p>username: ${localStorage.getItem("username")}</p>
              <p>email: ${localStorage.getItem("username")}</p>
            </div>
            <a type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                EDIT PROFILE
            </a>

          </div>
        </div>

        <div class="row justify-content-between mx-5" style="width:70%">
          <h2>STATS</h2>
        </div>
      </div>
      
      `;
  };
}

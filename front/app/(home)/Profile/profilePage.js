import { backgroundAccentColor } from "../../../../../assets/colors.js";
import editUser from "../../../services/api/editUser.js";
import getUser from "../../../services/api/getUser.js";
import { DashboardRoomBox } from "/components/DashboardRoomBox.js";

export default class ProfilePage {
  constructor(switchRoute, switchPage) {
    this.userId = localStorage.getItem('user_id');
    this.me = null;
    this.switchRoute = switchRoute;
    this.switchPage = switchPage;
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

  fetchData = async () => {
    this.me = await getUser(this.userId);
  }

  renderView = async () => {
    await this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {

    
    
    var submitButton = document.getElementById('submit-btn');

    var editProfileForm = document.getElementById('edit-profile-form');
    console.log("editProfileForm: ", editProfileForm);
    editProfileForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const usernameInput = document.querySelector("#edit-profile-username");
    const emailInput = document.querySelector("#edit-profile-email");




    console.log("target.value", event.target);

    // Your form handling logic goes here
    var fileInput = document.getElementById('change-avatar-input');
    var file = fileInput.files[0];
    const reader = new FileReader();
    let base64Image;

    reader.onloadend = function () {
        // Log or process the base64-encoded image
      base64Image = reader.result;
      console.log("username: ", usernameInput.value);
      console.log("email: ", emailInput.value);
      console.log("base64Image: ", base64Image);
      var startIndex = base64Image.indexOf(',') + 1;
      var cleanedBase64 = base64Image.substring(startIndex);
      editUser({username: usernameInput.value, email: emailInput.value, base64Image: cleanedBase64})
        // Your form handling logic goes here
    };




    // Read the file as Data URL, which results in a base64-encoded string
    reader.readAsDataURL(file);

    });
  }


  editProfileModal = () => {
    return `
    
    <div class="modal fade modal-container" id="editProfileInfoModal" tabindex="-1" role="dialog" aria-labelledby="editProfileInfoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" >
          <div class="modal-container modal-body">
          <form id="edit-profile-form" enctype="multipart/form-data">
            <div class="modal-header">
              <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
              <button type="button" class="btn-close dark-btn" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            
            <div class="modal-body">
            <div class="mb-3">
              <label for="formFile" class="form-label">Default file input example</label>
              <input id="change-avatar-input" class="form-control" type="file" id="formFile" accept=".png">
              </div>
              <div class="mb-3">
                <label for="username" class="col-form-label">Username:</label>
                <input id="edit-profile-username" type="text" class="form-control input-box" id="username" value="">
              </div>
              <div class="mb-3">
                <label for="email" class="col-form-label">Email:</label>
                <input id="edit-profile-email" type="text" class="form-control input-box" id="email" value="">
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary dark-btn" data-bs-dismiss="modal">Cancel</button>
              <button id="submit-btn" type="submit" class="btn btn-primary">Save Changes</button>
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
        <div class="profile-container" style="width:30%">
          <div class="d-flex align-items-center gap-4">  
            <div class="border rounded-circle border-primary border-3 style="border-radius: 50%;overflow: hidden">
              <img src="${"data:image/png;base64,"+this.me.profile_image_base64}" alt="avatar" width="100" height="100" style="object-fit:cover"/>
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
            </div>
            <a type="button" class="btn btn-primary dark-btn" data-bs-toggle="modal" data-bs-target="#editProfileInfoModal">
            EDIT PROFILE
            </a>

        </div>

        <div class="row justify-content-between mx-5" style="width:70%">
          <h2>STATS</h2>
        </div>
      </div>
      
      `;
  };
}

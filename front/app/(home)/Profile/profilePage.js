import { backgroundAccentColor } from "../../../../../assets/colors.js";
import { FriendBox } from "../../../components/FriendBox.js";
import { FriendRequestBox } from "../../../components/FriendRequestBox.js";
import getFriendRequests from "../../../services/api/friends/getFriendRequests.js";
import getFriends from "../../../services/api/friends/getFriends.js";
import editUser from "../../../services/api/users/editUser.js";
import getUser from "../../../services/api/users/getUser.js";
import { DashboardRoomBox } from "/components/DashboardRoomBox.js";

export default class ProfilePage {
  constructor(switchRoute, switchPage) {
    this.userId = localStorage.getItem("user_id");
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
    const friendRequests = await getFriendRequests(this.userId);
    this.friendRequests = friendRequests.friend_requests;
    const friends = await getFriends(this.userId);
    console.log("Friends initial: ", friends);
    this.friends = friends.friends;
    console.log("friends: ", this.friends);
  };

  renderView = async () => {
    await this.fetchData();
    const content = await this.getHtml();
    return content;
  };

  handleEditProfileSubmit = async (event) => {
    let usernameInput = document.querySelector("#edit-profile-username").value;
    let emailInput = document.querySelector("#edit-profile-email").value;

    if (usernameInput.length <= 0) usernameInput = this.me.username;
    if (emailInput.length <= 0) emailInput = this.me.email;

    console.log("username: ", usernameInput);
    console.log("email: ", emailInput);

    // Your form handling logic goes here
    var fileInput = document.getElementById("change-avatar-input");
    var file = fileInput.files[0];
    const reader = new FileReader();
    console.log("reader: ", reader);
    let base64Image;

    console.log("reader: ", reader);

    reader.onloadend = function () {
      console.log("enter reader.onloadend");
      // Log or process the base64-encoded image
      base64Image = reader.result;
      var startIndex = base64Image.indexOf(",") + 1;
      var cleanedBase64 = base64Image.substring(startIndex);
      const formData = new FormData();
      formData.append("email", emailInput);
      formData.append("username", usernameInput);
      formData.append("profile_image", cleanedBase64);
      editUser(formData, this.userId);
      this.renderView();
      return;
      // Your form handling logic goes here
    };
    editUser(
      {
        username: usernameInput,
        email: emailInput,
        profile_image: this.me.profile_image_base64,
      },
      this.userId
    );
    this.renderView();
    // Read the file as Data URL, which results in a base64-encoded string
    // reader.readAsDataURL(file);
  };

  addEventListeners = async () => {
    var submitButton = document.getElementById("submit-btn");

    var editProfileForm = document.getElementById("edit-profile-form");
    console.log("editProfileForm: ", editProfileForm);
    editProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.handleEditProfileSubmit(event);
    });
  };

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

            
            <div class="modal-body gap-5">
            <div class="d-flex gap-4">
              <div class="border rounded-circle border-primary border-3 style="border-radius: 50%;overflow: hidden">
                <img src="${
                  "data:image/png;base64," + this.me.profile_image_base64
                }" alt="avatar" width="100" height="100" style="object-fit:cover"/>
              </div>
              <div class="mb-3">
                <label for="formFile" class="form-label p-blue"><p class="p-blue">Default file input example</p></label>
                <input id="change-avatar-input" class="form-control" type="file" id="formFile" accept=".png">
              </div>
            </div>
              <div class="mb-3">
                <label for="username" class="col-form-label p-blue">Username:</label>
                <input id="edit-profile-username" type="text" class="form-control input-box" id="username" value="">
              </div>
              <div class="mb-3">
                <label for="email" class="col-form-label p-blue">Email:</label>
                <input id="edit-profile-email" type="text" class="form-control input-box" id="email" value="">
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary dark-btn" data-bs-dismiss="modal">Cancel</button>
              <button id="submit-btn" type="submit" class="btn btn-primary dark-btn" data-bs-dismiss="modal">Save Changes</button>
            </div>
           </form>
          </div>
        </div>
      </div>
    </div>`;
  };

  addFriendModal = () => {
    return `
            <div class="modal fade" id="addFriendModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" >
                <div class="modal-container modal-body">
                <form id="friend-request-form">

                <div class="modal-header">
                    <h5 class="modal-title" id="editProfileModalLabel">Add Friend</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <div class="mb-3">
                    <label for="request-username-input" class="col-form-label">Name:</label>
                    <input type="text" class="form-control input-box" id="request-username-input" value="">
                    </div>
                </div>

                <div class="modal-footer">
                    <button id="submit-btn" type="submit" class="btn btn-primary dark-btn">Add Friend</button>
                </div>
                </form>
                </div>
                </div>
            </div>
            </div>`;
  };

  friendRequestsModal = () => {
    return `
            <div class="modal fade" id="friendRequestsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content" >
                    <div class="modal-container modal-body">

                    <div class="modal-header">
                        <h5 class="modal-title" id="editProfileModalLabel">Friend requests</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                             ${this.friendRequests
                               .map((request) => `${FriendRequestBox(request)}`)
                               .join("")}
                            
                        </div>
                    </div>

                    </div>
                    </div>
                </div>
            </div>`;
  };

  getHtml = async () => {
    return `
    ${this.editProfileModal()}
    <div style="height:20px"></div>
    <div class="container">
      <div class="row gap-5">
        <div class="col-md-4">
          <div class="profile-container">
            <div class="d-flex align-items-center gap-4">  
              <div class="border rounded-circle border-primary border-3 style="border-radius: 50%">
                <img src="${
                  "data:image/png;base64," + this.me.profile_image_base64
                }" alt="avatar" width="80" height="80" style="object-fit: cover"/>
              </div>
              <div>
                <h1 style="font-size: 32px" class="glow">${localStorage.getItem(
                  "username"
                )}</h1>
                <p style="font-size:12px;">${this.me.email}</p>
              </div>
            </div>
            <div class="row justify-content-between">
              <div class="col">
                <!-- Empty column to align content -->
              </div>
              <div class="col-12">
                <a type="button" class="btn btn-block btn-primary dark-btn w-100" data-bs-toggle="modal" data-bs-target="#editProfileInfoModal">EDIT PROFILE</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7 mt-3 mt-md-0">
          <div class="flex-start">
            <h2 class="glow">FRIENDS</h2>
            ${this.addFriendModal()}
            ${this.friendRequestsModal()}
            <div class="d-flex gap-5">
            </div>
            <div style="height:35px"></div>
            <div class="d-flex row gap-5 rooms-container p-4">
            <div class="row justify-content-between m-0 p-0">
            <div class="row justify-content-between gap-1" style="">

            <div class="row rooms-rows-container m-0 mt-2">
            ${this.friends.map((friend) => FriendBox(friend)).join("")}
            </div> 
            <div class="d-flex gap-4">
            <div class="mt-auto">
            <button class="btn btn-sm dark-btn m-0 " data-bs-toggle="modal" data-bs-target="#addFriendModal">ADD FRIEND</button>
            </div>
            <div class="mt-auto">
            <button class="btn btn-sm dark-btn m-0 " data-bs-toggle="modal" data-bs-target="#friendRequestsModal">Friend Requests (${
              this.friendRequests.length
            })</button>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            <p>No games played yet</p>
          </div>
        </div>
      </div>
    </div>`;
  };
}

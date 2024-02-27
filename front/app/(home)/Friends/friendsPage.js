import { DashboardRoomBox } from "../../../components/DashboardRoomBox.js";
import { FriendBox } from "../../../components/FriendBox.js";
import { FriendRequestBox } from "../../../components/FriendRequestBox.js";
import getUser from "../../../services/api/getUser.js";
import getFriendRequests from "../../../services/api/getFriendRequests.js";
import createFriendRequest from "../../../services/api/createFriendRequest.js";
import acceptFriendRequest from "../../../services/api/acceptFriendRequest.js";
import getFriends from "../../../services/api/getFriends.js";

export default class FriendsPage {
  constructor(switchRoute, switchView, room) {
    this.room = room;
    this.userId = localStorage.getItem("user_id");
    this.me = null;
    this.friendRequests = [];
    this.switchRoute = switchRoute;
    this.switchView = switchView;
    this.friends = [
      { name: "friend1", status: 1 },
      { name: "friend2", status: 1 },
      { name: "friend3", status: 1 },
      { name: "friend3", status: 1 },
      { name: "friend3", status: 1 },
      { name: "friend3", status: 0 },
      { name: "friend3", status: 0 },
      { name: "friend3", status: 0 },
    ];
  }

  fetchData = async () => {
    this.me = await getUser(this.userId);
    const friendRequests = await getFriendRequests(this.userId);
    this.friendRequests = friendRequests.friend_requests;
    const friends = await getFriends(this.userId);
    this.friends = friends.friends;
    console.log("friends: ", this.friends);
  };

  renderView = async () => {
    await this.fetchData();
    console.log("friend requests: ", this.friendRequests);
    const content = await this.getHtml();
    return content;
  };

  addEventListeners = async () => {
    const friendRequestForm = document.getElementById("friend-request-form");
    friendRequestForm.addEventListener("submit", async (event) => {
      console.log("submitting");
      event.preventDefault();
      let usernameInput = document.querySelector(
        "#request-username-input"
      ).value;
      createFriendRequest(usernameInput);
    });

    this.friendRequests.map((request) => {
      console.log("request in eventlistener map: ", request);

      const acceptFriendRequestBtn = document.getElementById(
        `accept-friend-request-btn-${request.pk}`
      );
      acceptFriendRequestBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        acceptFriendRequest(request.pk);
      });
    });
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
        ${this.addFriendModal()}
        ${this.friendRequestsModal()}
        <div class="d-flex gap-5">
        </div>
        <div style="height:35px"></div>
        <div class="d-flex row gap-5 rooms-container p-4">
        <div class="d-flex m-0 p-0">
            <div class="row justify-content-between gap-1" style="">

              <div class="d-flex justify-content-between">
                  <div class="d-flex justify-content-between gap-4 align-items-center w-100">
                    <h1 style="font-size: 42px" class="glow">FRIENDS</h1>
                    <img src="../../../assets/rooms-icon.svg" />
                  </div>
              </div>
    
        
            <div class="row rooms-rows-container m-0 mt-2 ">
            ${this.friends.map((friend) => FriendBox(friend)).join("")}
            </div> 
            <div class="d-flex gap-4">
                <div class="mt-auto">
                    <button class="btn btn-sm dark-btn m-0 " data-bs-toggle="modal" data-bs-target="#addFriendModal">ADD FRIEND</button>
                </div>
                <div class="mt-auto">
                    <button class="btn btn-sm dark-btn m-0 " data-bs-toggle="modal" data-bs-target="#friendRequestsModal">Friend Requests (2)</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>`;
  };
}

import acceptFriendRequest from "../services/api/friends/acceptFriendRequest.js";
import { RoomCountRectangle } from "./RoomCountRectangle.js";

export const FriendRequestBox = (request) => {
  return `
      <div class="dashboard-room-box py-2 rounded-lg d-flex justify-content-between align-items-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-2">
              <img src="${
                "data:image/png;base64," + request.sender_profile_image
              }" width="30" height="30" />
            </div>
              <div class="col-2">
              <p style="font-size: 15px;width: 30px">${request.sender}</p>
              </div>
              <div class="col-2">
              
              </div>
              <div class="col-2">
              </div>
              <div class="col-4 d-flex">
                <div class="d-flex align-items-center justify-content-end">
                  <button data-bs-dismiss="modal" id="accept-friend-request-btn-${
                    request.pk
                  }" class="btn btn-sm dark-btn">✓</button>
                </div>
                <div class="d-flex align-items-center justify-content-end">
                  <button id="decline-friend-request-btn-${
                    request.pk
                  }"  data-bs-dismiss="modal" class="btn btn-sm dark-btn">X</button>
                </div>
              </div>
          </div>
        </div>
      </div>
      `;
};

import { RoomCountRectangle } from "./RoomCountRectangle.js";

export const FriendBox = (friend) => {
  const roomCountRectangles = [];
  console.log("friend: ", friend);

  // for (let i = 0; i < 4; i++) {
  //   // console.log("i: ", i);
  //   if (i < room.numPlayers) roomCountRectangles.push(true);
  //   else roomCountRectangles.push(false);
  // }

  const onlineStatus = friend.status ? "online" : "offline";

  return `
      <div class="dashboard-room-box py-2 rounded-lg d-flex justify-content-between align-items-center flex-start">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-2">
               <img src="${
                 "data:image/png;base64," + friend.profile_image
               }" width="30" height="30" />
            </div>
              <div class="col-2">
              <p style="font-size: 15px;width: 30px">${friend.friend}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${onlineStatus}</p>
              </div>
              <div class="col-2">
              </div>
              <div class="col-4">
                <div class="d-flex align-items-center justify-content-end">
                <button id="remove-friend-btn-${
                  friend.friend_id
                }"class="btn btn-sm dark-btn">X</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      `;
};

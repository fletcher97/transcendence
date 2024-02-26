import { RoomCountRectangle } from "./RoomCountRectangle.js";

export const FriendBox = (friend) => {
  const roomCountRectangles = [];

  // for (let i = 0; i < 4; i++) {
  //   // console.log("i: ", i);
  //   if (i < room.numPlayers) roomCountRectangles.push(true);
  //   else roomCountRectangles.push(false);
  // }

  const onlineStatus = friend.status ? "online" : "offline"

  return `
      <div class="dashboard-room-box py-2 rounded-lg d-flex justify-content-between align-items-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-2">
              <img src="https://avatar.iran.liara.run/public/boy?username=Ash" width="30" height="30" />
            </div>
              <div class="col-2">
              <p style="font-size: 15px;width: 30px">${friend.name}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${onlineStatus}</p>
              </div>
              <div class="col-2">
              </div>
              <div class="col-4">
                <div class="d-flex align-items-center justify-content-end">
                <button id="rm-friend-btn" class="btn btn-sm dark-btn">X</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      `;
};
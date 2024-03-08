import { RoomCountRectangle } from "./RoomCountRectangle.js";

export const DashboardRoomBox = (room) => {
  const roomCountRectangles = [];

  console.log("room in DashboardRoomBox: ", room);
  const numPlayers = room.player2 ? 2 : 1;

  for (let i = 0; i < 2; i++) {
    // console.log("i: ", i);
    if (i < numPlayers) roomCountRectangles.push(true);
    else roomCountRectangles.push(false);
  }

  // <button style="font-size: 15px" class="btn dark-btn">👀</button>

  return `
      <div class="dashboard-room-box py-2 mx-0 rounded-lg d-flex justify-content-between align-items-center">
        <div class="container mx-0">
          <div class="row align-items-center">
            <div class="col-2">
              <div class="d-flex align-items-center">
                ${roomCountRectangles.map((fill) => RoomCountRectangle(fill))}
              </div>
             </div>
              <div class="col-2">
                <p style="font-size: 15px;width: 30px">${room.name}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${room.updated_at}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${
                room.is_active ? "waiting" : "playing"
              }</p>
              </div>
              <div class="col-4">
                <div class="d-flex align-items-center justify-content-end gap-3">
                
                  
                  <button style="font-size: 15px" class="btn meta-pong-btn">JOIN</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      `;
};

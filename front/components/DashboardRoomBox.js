import { RoomCountRectangle } from "./RoomCountRectangle.js";

export const DashboardRoomBox = ({ room }) => {
  const roomCountRectangles = [];

  for (let i = 0; i < 4; i++) {
    // console.log("i: ", i);
    if (i < room.numPlayers) roomCountRectangles.push(true);
    else roomCountRectangles.push(false);
  }
  console.log("room count rectangles: ", roomCountRectangles);

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
              <p style="font-size: 15px;width: 30px">${room.game}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${room.name}</p>
              </div>
              <div class="col-2">
              <p style="font-size: 15px">${room.numPlayers}</p>
              </div>
              <div class="col-4">
                <div class="d-flex align-items-center justify-content-end">
                
                  <a style="font-size: 15px" class="btn dark-btn">WATCH</a>
                  <a style="font-size: 15px" class="btn active">JOIN</a>
                </div>
            </div>
          </div>
        </div>
      </div>
      `;
};

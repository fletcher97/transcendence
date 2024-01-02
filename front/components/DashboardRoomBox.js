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
      <div class="py-3 rounded-lg d-flex justify-content-between align-items-center border">
      <div class="d-flex align-items-center">
      ${roomCountRectangles.map((fill) => RoomCountRectangle(fill))}
      </div>
        <p style="font-size: 15px;width: 30px">${room.game}</p>
        <p style="font-size: 15px">${room.name}</p>
        <p style="font-size: 15px">${room.numPlayers}</p>
        <div class="d-flex align-items-center">
          <a style="font-size: 15px" class="btn">WATCH</a>
          <a style="font-size: 15px" class="btn active">JOIN</a>
        </div>
      </div>
      `;
};

export const DashboardRoomBox = ({ room }) => {
  return `
      <div class="rounded-lg d-flex justify-content-between align-items-center border">
        <img src="https://i.imgur.com/8QZqZ9t.png" alt="avatar" width="15" height="15"/>
        <p style="font-size: 10px;width: 30px">${room.game}</p>
        <p style="font-size: 10px">${room.name}</p>
        <p style="font-size: 10px">${room.numPlayers}</p>
        <a style="font-size: 10px" class="btn">JOIN</a>
      </div>
      `;
};

import { DOMAIN_NAME } from "../../config.js";

export const newClassicPongSocket = (roomName) => {
  const socket = new WebSocket(`${DOMAIN_NAME}/api/ws/${roomName}`);

  return socket;
};

export const classicPongConnectionMessage = (socket, payload) => {
  socket.send(JSON.stringify(payload));
};

export const classicPongKeyMessage = (socket, payload) => {
  const key = event.key === "ArrowUp" ? 1 : -1;
  const message = {
    type: "movement",
    key: key,
  };
  socket.send(JSON.stringify(message));
};

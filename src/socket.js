import io from "socket.io-client";
import store from "./store.js";

const socket = io("http://localhost:8080");
//const socket = io("http://10.80.146.4:8080");
console.log("Websocket connected");

socket.on("CONFIGURATION", configuration => {
  store.dispatch({ type: "CONFIGURATION", configuration });
});

socket.on("DEVICE_DATA_ALL", ({ state, history }) => {
  store.dispatch({ type: "DEVICE_DATA_ALL", state, history });
});

socket.on("DEVICE_DATA_UPDATE", ({ id, state, history }) => {
  store.dispatch({ type: "DEVICE_DATA_UPDATE", id, state, history });
});

export default socket;

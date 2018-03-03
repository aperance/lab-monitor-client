import io from "socket.io-client";
import store from "./store.js";

//const socket = io("http://localhost:8080");
const socket = io("http://10.80.146.123:8080");
console.log("Websocket connected");

socket.on("SET_CONFIGURATION", configuration => {
  store.dispatch({ type: "SET_CONFIGURATION", configuration });
});

socket.on("POPULATE_TABLE", allRows => {
  store.dispatch({ type: "POPULATE_TABLE", allRows });
});

socket.on("POPULATE_HISTORY", allRows => {
  store.dispatch({ type: "POPULATE_HISTORY", allRows });
});

socket.on("UPDATE_ROW", ({ id, changes }) => {
  store.dispatch({ type: "UPDATE_ROW", id, changes });
});

export default socket;

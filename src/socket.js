import io from "socket.io-client";
const socket = io("http://10.80.146.123:8080");
console.log("Websocket connected");

const connectStoreToSocket = store => {
  socket.on("SET_CONFIGURATION", configuration => {
    store.dispatch({ type: "SET_CONFIGURATION", configuration });
  });

  socket.on("POPULATE_TABLE", allRows => {
    store.dispatch({ type: "POPULATE_TABLE", allRows });
  });

  socket.on("UPDATE_ROW", ({ id, changes }) => {
    store.dispatch({ type: "UPDATE_ROW", id, changes });
  });
};

const requestAction = (targets, type) => {
  socket.emit("REQUEST_ACTION", targets, type, response =>
    console.log(response)
  );
};

export { connectStoreToSocket, requestAction };

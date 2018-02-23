import io from "socket.io-client";

export default function(store) {
  const socket = io.connect(`http://localhost:8080`);

  socket.on("SET_CONFIGURATION", configuration => {
    store.dispatch({ type: "SET_CONFIGURATION", configuration });
  });

  socket.on("POPULATE_TABLE", allRows => {
    store.dispatch({ type: "POPULATE_TABLE", allRows });
  });

  socket.on("UPDATE_ROW", ({ id, changes }) => {
    store.dispatch({ type: "UPDATE_ROW", id, changes });
  });
}

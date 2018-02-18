import io from "socket.io-client";

export default function(store) {
  const socket = io.connect(`http://localhost:4000`);

  socket.on("setConfiguration", configuration => {
    store.dispatch({ type: "SET_CONFIGURATION", configuration });
  });

  socket.on("populateTable", allRows => {
    store.dispatch({ type: "POPULATE_TABLE", allRows });
  });

  socket.on("updateTable", updatedRow => {
    store.dispatch({ type: "UPDATE_TABLE", updatedRow });
  });
}

import io from "socket.io-client";

export default function(store) {
  const socket = io.connect(`http://localhost:4000`);

  socket.on("tablePopulate", tableData => {
    store.dispatch({ type: "TABLE_POPULATE", tableData });
  });

  socket.on("tableUpdate", updatedRow => {
    store.dispatch({ type: "TABLE_UPDATE", updatedRow });
  });
}

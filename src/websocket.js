import store from "./store.js";
import {
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  actionResponseSet
} from "./actions/actionCreators";

const socket = new WebSocket("ws://localhost:4000/data");
console.log("Websocket connected");

socket.addEventListener("message", message => {
  const data = JSON.parse(message.data);
  switch (data.type) {
    case "CONFIGURATION":
      store.dispatch(configuration(data));
      break;
    case "DEVICE_DATA_ALL":
      store.dispatch(deviceDataAll(data));
      break;
    case "DEVICE_DATA_UPDATE":
      store.dispatch(deviceDataUpdate(data));
      break;
    case "DEVICE_ACTION_RESPONSE":
      console.log(data);
      store.dispatch(actionResponseSet(data.result));
      break;
    case "PSTOOLS_COMMAND_RESPONSE":
      console.log(data);
      break;
    default:
      break;
  }
});

export default socket;

export const sendDeviceAction = (targets, action, parameters = {}) => {
  socket.send(
    JSON.stringify({ type: "DEVICE_ACTION", targets, action, parameters })
  );
};

export const sendPsToolsCommand = (target, { mode, cmd }) => {
  socket.send(JSON.stringify({ type: "PSTOOLS_COMMAND", target, mode, cmd }));
};

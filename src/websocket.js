import store from "./store.js";
import {
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  resetAll,
  psToolsResponse,
  actionResponseSet
} from "./actions/actionCreators";

//const socket = new WebSocket("ws://localhost:4000/data");
const socket = new WebSocket("ws://10.80.132.129:4000/data");
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
      store.dispatch(actionResponseSet(data.result));
      break;
    case "PSTOOLS_COMMAND_RESPONSE":
      store.dispatch(psToolsResponse(data.result));
      break;
    default:
      break;
  }
});

socket.addEventListener("close", () => {
  console.log("websocket closed");
  store.dispatch(resetAll());
});

export default socket;

export const sendDeviceAction = (targets, action, parameters = {}) => {
  socket.send(
    JSON.stringify({ type: "DEVICE_ACTION", targets, action, parameters })
  );
};

export const sendPsToolsCommand = (target, { mode, cmd }) => {
  console.log("Sending PSTools Command");

  socket.send(JSON.stringify({ type: "PSTOOLS_COMMAND", target, mode, cmd }));
};

/** @module WebSocket */

import { WsMessage } from "./types";
import { errorMessageSet, resetAll } from "./actions/actionCreators";
import { inboundMessageRouter } from "./messageHandler";
import store from "./store";

/**
 * Establishes websocket connection to serve, and handles inbound and
 * outbound communication.
 *
 * @param {string} url
 */
class Socket {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  /**
   * Stringify and emit message object to websocket server.
   *
   * @param {WsMessage} message
   */
  public sendToServer(message: WsMessage) {
    if (this.socket) this.socket.send(JSON.stringify(message));
  }

  /**
   * Connect (or reconnect) to websocket server.
   */
  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener("open", () => {
      console.log("websocket connected");

      if (this.socket)
        this.socket.onmessage = message => {
          inboundMessageRouter(JSON.parse(message.data) as unknown);
        };
    });

    this.socket.onclose = () => {
      store.dispatch(resetAll());
      store.dispatch(
        errorMessageSet({
          err: new Error("Disconnected from server")
        })
      );
      setTimeout(this.connect.bind(this), 5000);
    };
  }
}

export default new Socket("ws://10.91.1.1:4000/data");

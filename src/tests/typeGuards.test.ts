import {
  isWsMessage
  // isDeviceDataAll,
  // isDeviceDataUpdate,
  // isDeviceActionResponse,
  // isPsToolsResponse
} from "../typeGuards";

test("accepts a proper websocket message", () => {
  const message = {
    type: "TEST_MESSAGE",
    payload: { test: "TEST_PAYLOAD" }
  };
  const result = isWsMessage(message);
  expect(result).toBe(true);
});

test("rejects a message without type field", () => {
  const message = {
    payload: { test: "TEST_PAYLOAD" }
  };
  const result = isWsMessage(message);
  expect(result).toBe(false);
});

test("rejects a message without payload field", () => {
  const message = {
    type: "TEST_MESSAGE"
  };
  const result = isWsMessage(message);
  expect(result).toBe(false);
});

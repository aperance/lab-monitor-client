import {
  isWsMessage,
  isDeviceDataAll
  // isDeviceDataUpdate,
  // isDeviceActionResponse,
  // isPsToolsResponse
} from "../typeGuards";

describe("isWsMessage type guard", () => {
  test("accepts a proper websocket message", () => {
    expect(isWsMessage({ type: "TEST", payload: {} })).toBe(true);
  });
  test("rejects message without test field", () => {
    expect(isWsMessage({ payload: {} })).toBe(false);
  });
  test("rejects message without payload field", () => {
    expect(isWsMessage({ type: "TEST" })).toBe(false);
  });
  test("rejects message with unexpected field", () => {
    expect(isWsMessage({ type: "TEST", payload: {}, x: {} })).toBe(false);
  });
  describe("type field validation", () => {
    test.each([undefined, null, {}, { x: "x" }, 0, [], ["x"], true, false])(
      "rejects %p",
      x => {
        expect(isWsMessage({ type: x, payload: {} })).toBe(false);
      }
    );
  });
  describe("payload field validation", () => {
    test.each([undefined, null, "TEST", 0, true, false])("rejects %p", x => {
      expect(isWsMessage({ type: "TEST", payload: x })).toBe(false);
    });
  });
});

describe("isDeviceDataAll type guard", () => {
  test("accepts a proper DeviceDataAll object", () => {
    const payload = {
      state: { id: { property: "value" } },
      history: {
        id: { property: [["timestamp", "value"], ["timestamp", null]] }
      }
    };
    expect(isDeviceDataAll(payload)).toBe(true);
  });

  test("rejects a DeviceDataAll object without a state field", () => {
    const payload = {
      history: {
        id: { property: [["timestamp", "value"], ["timestamp", null]] }
      }
    };
    expect(isDeviceDataAll(payload)).toBe(false);
  });

  test("rejects a DeviceDataAll object without a history field", () => {
    const payload = {
      state: { id: { property: "value" } }
    };
    expect(isDeviceDataAll(payload)).toBe(false);
  });

  test("rejects a DeviceDataAll object with an unexpected field", () => {
    const payload = {
      state: { id: { property: "value" } },
      history: {
        id: { property: [["timestamp", "value"], ["timestamp", null]] }
      },
      x: {}
    };
    expect(isDeviceDataAll(payload)).toBe(false);
  });

  describe("state field validation", () => {
    test.each([undefined, null, 0, {}, [], ["x"], true, false])(
      "rejects %p",
      x => {
        const payload = {
          state: x,
          history: {
            id: { property: [["timestamp", "value"], ["timestamp", null]] }
          }
        };
        expect(isDeviceDataAll(payload)).toBe(false);
      }
    );
  });
  describe("state sub-field validation", () => {
    test.each([undefined, null, 0, [], ["x"], true, false])("rejects %p", x => {
      const payload = {
        state: { id: x },
        history: {
          id: { property: [["timestamp", "value"], ["timestamp", null]] }
        }
      };
      expect(isDeviceDataAll(payload)).toBe(false);
    });
  });
});

import * as React from "react";
import { render, cleanup } from "react-testing-library";
import StatusIndicator from "../StatusIndicator";

test("renders an svg", () => {
  const { container } = render(
    <StatusIndicator status="CONNECTED" timestamp="Sun 11/25 12:00:00 AM" />
  );
  expect(container.querySelectorAll("svg").length).toEqual(1);
  cleanup();
});

import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import ToolbarItem from "../ToolbarItem";

test("renders label and icons", () => {
  const { queryAllByText } = render(
    <ToolbarItem
      name="Name"
      leftIcon="left_icon"
      rightIcon="right_icon"
      isSelected={false}
      onClick={() => null}
    />
  );
  expect(queryAllByText("left_icon").length).toEqual(1);
  expect(queryAllByText("Name").length).toEqual(1);
  expect(queryAllByText("right_icon").length).toEqual(1);
  cleanup();
});

test("onClick function called on click event", () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <ToolbarItem
      name="Name"
      leftIcon="left_icon"
      rightIcon="right_icon"
      isSelected={false}
      onClick={onClickMock}
    />
  );
  const button = container.querySelector("div[role='button']");
  expect(button).not.toBeNull();
  if (button) {
    fireEvent.click(button);
    expect(onClickMock.mock.calls.length).toEqual(1);
  }
  cleanup();
});

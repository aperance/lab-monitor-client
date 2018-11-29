import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import Drawers from "../Drawers";

const isResizingMock = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test("zero drawers are visible", () => {
  const { container, getAllByTestId } = render(
    <Drawers
      drawersVisible={0}
      isResizing={isResizingMock}
      leftDrawer={<div data-testid="mockDrawerContents" />}
      rightDrawer={null}
    />
  );
  const style = container.getElementsByTagName("div")[0].style;
  expect(style.transform).toEqual("translateX(1000px)");
  expect(getAllByTestId("mockDrawerContents").length).toEqual(1);
});

test("one drawer is visible with contents rendered", () => {
  const { container, getAllByTestId } = render(
    <Drawers
      drawersVisible={1}
      isResizing={isResizingMock}
      leftDrawer={<div data-testid="mockDrawerContents" />}
      rightDrawer={null}
    />
  );
  const style = container.getElementsByTagName("div")[0].style;
  expect(style.transform).toEqual("translateX(800px)");
  expect(getAllByTestId("mockDrawerContents").length).toEqual(1);
});

test("two drawers are visible with contents rendered", () => {
  const { container, getAllByTestId } = render(
    <Drawers
      drawersVisible={2}
      isResizing={isResizingMock}
      leftDrawer={<div data-testid="mockDrawerContents" />}
      rightDrawer={<div data-testid="mockDrawerContents" />}
    />
  );
  const style = container.getElementsByTagName("div")[0].style;
  expect(style.transform).toEqual("translateX(0px)");
  expect(getAllByTestId("mockDrawerContents").length).toEqual(2);
});

test("isResizing function called on mouse events", () => {
  const drawers = (
    <Drawers
      drawersVisible={2}
      isResizing={isResizingMock}
      leftDrawer={<div data-testid="mockDrawerContents" />}
      rightDrawer={<div data-testid="mockDrawerContents" />}
    />
  );
  const { container, getByRole, rerender } = render(drawers);

  fireEvent.mouseDown(getByRole("dragbar"));
  rerender(drawers);
  fireEvent.mouseUp(container);
  rerender(drawers);

  expect(isResizingMock.mock.calls.length).toEqual(3);
  expect(isResizingMock.mock.calls[0][0]).toEqual(false);
  expect(isResizingMock.mock.calls[1][0]).toEqual(true);
  expect(isResizingMock.mock.calls[2][0]).toEqual(false);
});

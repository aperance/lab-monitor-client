import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import LogLevel from "../LogLevel";

const testLevels = ["LevelA", "LevelB", "LevelC"];
const testNamespaces = ["NamespaceA", "NamespaceB", "NamespaceC"];

const sendDeviceCommandMock = jest.fn();
const closeMock = jest.fn();

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test("not rendered if open=false", () => {
  const { container } = render(
    <LogLevel
      open={false}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  expect(container.innerHTML).toEqual("");
});

test("rendered if open=true", () => {
  const { getByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  const container = getByRole("dialog");
  expect(container.getElementsByTagName("input").length).toEqual(2);
  expect(container.getElementsByTagName("button").length).toEqual(1);
});

test("correct options given for namespace dropdown", () => {
  const { getAllByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  expect(getAllByRole("option")[0].textContent).toEqual(testNamespaces[0]);
  expect(getAllByRole("option")[1].textContent).toEqual(testNamespaces[1]);
  expect(getAllByRole("option")[2].textContent).toEqual(testNamespaces[2]);
});

test("correct options given for level dropdown", () => {
  const { getAllByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[1]);
  expect(getAllByRole("option")[0].textContent).toEqual(testLevels[0]);
  expect(getAllByRole("option")[1].textContent).toEqual(testLevels[1]);
  expect(getAllByRole("option")[2].textContent).toEqual(testLevels[2]);
});

test("close function called on submit", () => {
  const { getByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(closeMock).toBeCalledTimes(1);
});

test("close function called on background click", () => {
  const { getByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getByRole("document"));
  expect(closeMock).toBeCalledTimes(1);
});

test("sendDeviceCommand function called on submit", () => {
  const { getByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(sendDeviceCommandMock).toBeCalledTimes(1);
  expect(sendDeviceCommandMock).toBeCalledWith("", "");
});

test("sendDeviceCommand function NOT called on background click", () => {
  const { getByRole } = render(
    <LogLevel
      open={true}
      levels={testLevels}
      namespaces={testNamespaces}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getByRole("document"));
  expect(sendDeviceCommandMock).toBeCalledTimes(0);
});

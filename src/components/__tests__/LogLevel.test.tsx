import * as React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import LogLevel from "../LogLevel";
import { ConfigurationContext } from "../../configuration/ConfigurationContext";

const sendDeviceCommandMock = jest.fn();
const closeMock = jest.fn();

const testData = {
  level: ["LevelA", "LevelB", "LevelC"],
  namespace: ["NamespaceA", "NamespaceB", "NamespaceC"]
};

const renderWithContext = (element: JSX.Element) =>
  render(
    // @ts-ignore
    <ConfigurationContext.Provider value={{ logLevel: testData }}>
      {element}
    </ConfigurationContext.Provider>
  );

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test("not rendered if open=false", () => {
  const { container } = renderWithContext(
    <LogLevel
      open={false}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  expect(container.innerHTML).toEqual("");
});

test("rendered if open=true", () => {
  const { getByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  const container = getByRole("dialog");
  expect(container.getElementsByTagName("input").length).toEqual(2);
  expect(container.getElementsByTagName("button").length).toEqual(1);
});

test("correct options given for namespace dropdown", () => {
  const { getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  expect(getAllByRole("option")[0].textContent).toEqual(testData.namespace[0]);
  expect(getAllByRole("option")[1].textContent).toEqual(testData.namespace[1]);
  expect(getAllByRole("option")[2].textContent).toEqual(testData.namespace[2]);
});

test("correct options given for level dropdown", () => {
  const { getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[1]);
  expect(getAllByRole("option")[0].textContent).toEqual(testData.level[0]);
  expect(getAllByRole("option")[1].textContent).toEqual(testData.level[1]);
  expect(getAllByRole("option")[2].textContent).toEqual(testData.level[2]);
});

test("sendDeviceCommand function called on submit", () => {
  const { getByRole, getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  fireEvent.click(getAllByRole("option")[0]);
  fireEvent.click(getAllByRole("button")[1]);
  fireEvent.click(getAllByRole("option")[5]);
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(sendDeviceCommandMock).toBeCalledTimes(1);
  expect(sendDeviceCommandMock).toBeCalledWith(
    testData.namespace[0],
    testData.level[2]
  );
});

test("sendDeviceCommand function NOT called on background click", () => {
  const { getByRole, getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  fireEvent.click(getAllByRole("option")[0]);
  fireEvent.click(getAllByRole("button")[1]);
  fireEvent.click(getAllByRole("option")[5]);
  fireEvent.click(getByRole("document"));
  expect(sendDeviceCommandMock).toBeCalledTimes(0);
});

test("close function called on submit", () => {
  const { getByRole, getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  fireEvent.click(getAllByRole("option")[0]);
  fireEvent.click(getAllByRole("button")[1]);
  fireEvent.click(getAllByRole("option")[5]);
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(closeMock).toBeCalledTimes(1);
});

test("close function called on background click", () => {
  const { getByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getByRole("document"));
  expect(closeMock).toBeCalledTimes(1);
});

test("unable to submit with empty namespace", () => {
  const { getByRole, getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[1]);
  fireEvent.click(getAllByRole("option")[0]);
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(sendDeviceCommandMock).toBeCalledTimes(0);
});

test("unable to submit with empty level", () => {
  const { getByRole, getAllByRole } = renderWithContext(
    <LogLevel
      open={true}
      sendDeviceCommand={sendDeviceCommandMock}
      close={closeMock}
    />
  );
  fireEvent.click(getAllByRole("button")[0]);
  fireEvent.click(getAllByRole("option")[0]);
  fireEvent.click(getByRole("document").getElementsByTagName("button")[0]);
  expect(sendDeviceCommandMock).toBeCalledTimes(0);
});

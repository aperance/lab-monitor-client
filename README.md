# QA Lab Monitor

A utility that monitors the state of multiple embedded devices and displays the consolidated data to the user through a dashboard interface. This project was created to help me quickly troubleshoot issues as part of my job QA testing embedded devices. Previously I would need to keep track of the IP addressses of all devices being tested and manually access their APIs to collect data.

The backend component is a Node.js server that contiuously polls multiple embedded devices and requests their current state using a provided api. The frontend component is a React/Redux application which receives the current state for all devices via a websocket connection and displays it to the user.

This repository stores the source code for the frontend only. The backend repository can be found at <https://www.github.com/aperance/lab-monitor-server>.

A live demo version of this app is hosted at <https://qa.aperance.dev>.

## How to Use

Once loaded, a table is displayed showing all embedded devices currently being monitored and their key attributes such as serial number and IP address. Additionally a status indicator icon is shown for each device (green if connected, yellow if connection lost but retry pending, and red if disconnected and retry failed). The user may sort the table by any column by clicking on the column header, and filter the table by selecting from the checkboxes on the left side of the app.

Note: When in demo mode the server generates random data to simulate connected embedded devices.

The user may select a row by clicking on it. When selected a toolbar will be revealed on the right side of the app. This toolbar includes sub-views that the user can access and the ability to trigger actions on the embedded device.

![](demo.gif)

## Features

### State
The State sub-view opens an iFrame that displays the raw state data exposed on the HTTP endpoint of the embedded device.

### History
The History sub-view lists all state property keys for the embedded device. Once a key is selected the history of the 10 most recent values received is displayed.

### PSTools
The PSTools sub-view provides the user the ability to run remote commands on the embedded device, usually starting or stopping a service. This is done by passing the request to the server, which then runs the command on the device remotely using the PSTools utility suite.

### VNC
The VNC sub-view opens an interactive VNC client embedded in the app, giving the user full control of the embedded device. This works by proxying the VNC data through the backend server and wrapping the data in a web socket message between the server and client.

### Logs
Link to the internal logs of the embedded device (files hosted on the device itself).

### Device Actions
Buttons to trigger actions on the embedded device such as reboot, clear log files, or clear non-volitile memory. This works by sending an HTTP request to the devices enpoint to trigger the actions.

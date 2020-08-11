# QA Lab Monitor

This project is a utility created to assist my job QA testing embedded devices.

The frontend is a React/Redux application with a dashboard interface displaying all active devices and their current states. The frontend receives updates in real time via a WebSockets connection. This repository stores the source code for the frontend only.

The backend is a Node.js/Express server that contiuously polls multiple embedded devices and requests their current state using a provided api. The backend repository can be found at <github.com/aperance/lab-monitor-server>.

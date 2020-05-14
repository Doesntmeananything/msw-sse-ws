# Testing [MSW](https://redd.gitbook.io/msw/) with SSE and WS

This repository is set up to test whether it's possible to mock Server-sent events and WebSocket connections using [MSW](https://redd.gitbook.io/msw/).

The current and very simple approach is the following:

- Start a basic server instances that continuously sends SSE and opens a WS connection.
- Start a client that interacts with SSE and WS connections, logging incoming events through a mock service worker.
- Observe the results of the logging process.

## How to run

1. Clone the repository.
2. Install the dependencies using `yarn install`.
3. Run `yarn msw-test` which simultanously start both the server and the client.
4. Once the client starts, proceed to the opened browser tab, open developer console, and observe the results.

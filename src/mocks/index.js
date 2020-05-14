import { setupWorker } from "msw";

const { start } = setupWorker({
  predicate(req) {
    console.log(req);
    // log captured requests, but bypass them
    return false;
  },
  resolver: () => null,
});

start();

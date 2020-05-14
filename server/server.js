const FastifySSEPlugin = require("fastify-sse-v2").FastifySSEPlugin;
const promisify = require("util").promisify;

const sleep = promisify(setTimeout);

// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("fastify-cors"), {
  origin: true,
});

fastify.register(FastifySSEPlugin);
fastify.register(require("fastify-websocket"));

// Websockets
fastify.get("/websocket", { websocket: true }, async (connection, req) => {
  connection.socket.on("message", (message) => {
    // message === 'hi from client'
    connection.socket.send("hi from server");
  });
});

// Server-sent events using AsyncIterable source
fastify.get("/sse", function (req, res) {
  res.sse(
    (async function* source() {
      for (let i = 0; i < 3; i++) {
        yield { id: String(i), data: "Some message" };
      }
      await sleep(3000);
    })()
  );
});

// Run the server!
fastify.listen(5000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});

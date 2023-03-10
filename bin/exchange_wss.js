#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require("../exchange_app");
const debug = require("debug")("exchange-wss:server");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Create Socket io with created server
 */
const io = require("socket.io")(server, { cors: true });

/**
 * Listen on connection
 */
io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("message", (msg) => {
    // 广播给所有人
    io.emit("message", msg);
  });

  socket.on("ping", (msg) => {
    // 只发给发送人
    socket.emit("pong", msg);
  });
});

/**
 * Normalize a port into a number, string, or false.
 *
 * @param {string|number} val
 * @return {number|false}
 */
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 *
 * @param {error} error
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

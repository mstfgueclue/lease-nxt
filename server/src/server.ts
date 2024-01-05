import app from "./app";
import http from "http";
import dotenv from "dotenv";
import debug from "debug";

dotenv.config();
const serverDebug = debug("lease-nxt:server");

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  serverDebug(`Server running on port ${PORT}`);
});

export default server;

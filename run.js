import { createServer } from "vite";

const server = await createServer();

const mod = await server.ssrLoadModule("src/index.js");
mod.list_fruits();

await server.close();

import express, {request, response} from "express";
import http from "node:http";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

export default function onHTTPRequestHandler(request, response) {
    const app = express();
    const server = http.createServer(app);
    const serverPort = process.env.SERVER_PORT;
    const serverHost = process.env.SERVER_HOST;

    app.use(cors());
    server.listen(serverPort, serverHost);

    return {app, server};
}
import express, {request, response} from "express";
import http from "node:http";
import cors from "cors";


export default function onHTTPRequestHandler(request, response) {
    const app = express();
    const server = http.createServer(app);

    app.use(cors());1
    server.listen(8080, "localhost");

    return {app, server};
}
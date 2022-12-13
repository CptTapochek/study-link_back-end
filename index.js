// import * as express from "express";
// import * as url from "url";
import { graphqlHTTP } from "express-graphql";
import { resolvers as rootValue, schema } from "./gql/index.js";
import onHTTPRequestHandler from "./server/http-server.js";

const { app: httpApp, server: httpServer } = onHTTPRequestHandler();
const GraphQL = graphqlHTTP({ schema, rootValue, graphiql: true });

httpApp.use("/api", GraphQL);
httpApp.set("Access-Control-Allow-Origin", "*");
httpApp.set("Access-Control-Allow-Headers", "content-type");
httpApp.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
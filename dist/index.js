"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const MongodbConnection_1 = require("./Connection/MongodbConnection");
const express_graphql_1 = require("express-graphql");
const Handler_1 = __importDefault(require("./Handlers/Handler"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({ schema: Handler_1.default, graphiql: true }));
const startServer = () => {
    (0, MongodbConnection_1.ConnectMongodb)(process.env.MongoDbUrl ? process.env.MongoDbUrl : '').then(() => {
        app.listen(process.env.Port, () => {
            console.log(`port ${process.env.Port} started`);
        });
    });
};
startServer();

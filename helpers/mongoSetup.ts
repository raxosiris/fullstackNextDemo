import { createConnection} from "typeorm";
import { User } from "../models/userModel";


export const mongoConnection = () =>  createConnection({
    type: "mongodb",
    host: process.env.MONGO_HOST || "localhost",
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT) : 27017,
    database: process.env.MONGO_DB || "test",
    entities: [User],
    autoReconnect: true
  });
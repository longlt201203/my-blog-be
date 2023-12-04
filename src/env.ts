import { config } from "dotenv";

config();

const Env = {
    LISTEN_PORT: parseInt(process.env.LISTEN_PORT ?? "3000"),
    CONNECTION_STRING: process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/"
};

export default Env;
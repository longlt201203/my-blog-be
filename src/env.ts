import { config } from "dotenv";

config();

const Env = {
    LISTEN_PORT: parseInt(process.env.LISTEN_PORT ?? "3000"),
    CONNECTION_STRING: process.env.CONNECTION_STRING ?? "mongodb://localhost:27017/",
    JWT_SECRET: process.env.JWT_SECRET ?? "mysecret",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "client-id",
    INIT_CODE: process.env.INIT_CODE ?? "initcode",
    HASH_SECRET: process.env.HASH_SECRET ?? "hashsecret"
};

export default Env;
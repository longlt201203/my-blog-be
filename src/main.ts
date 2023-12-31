import "reflect-metadata";
import express, { json, urlencoded } from "express";
import router from "./router";
import Env from "./env";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/../public"));

app.use(router);

mongoose.connect(Env.CONNECTION_STRING).then(mg => {
    app.listen(Env.LISTEN_PORT, () => {
        console.log(`App is listening at ${Env.LISTEN_PORT}`);
    });
}).catch(err => {
    console.log(Env.CONNECTION_STRING);
    console.error("Failed to connect to database");
    console.error(err);
});
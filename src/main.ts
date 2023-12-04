import express, { json, urlencoded } from "express";
import router from "./router";
import Env from "./env";
import mongoose from "mongoose";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

mongoose.connect(Env.CONNECTION_STRING).then(mg => {
    app.listen(Env.LISTEN_PORT, () => {
        console.log(`App is listening at ${Env.LISTEN_PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database");
    console.error(err);
});
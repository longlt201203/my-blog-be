import mongoose from "mongoose";
import Env from "./env";

mongoose.connect(Env.CONNECTION_STRING);
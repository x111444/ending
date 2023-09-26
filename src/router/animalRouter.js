import express from "express";
import {getJoin,postJoin,getLogin,postLogin} from "../constroller/animalControllers"
import { publicOnly } from "../middlewares";
const mainRouter = express.Router()


mainRouter.get("/",home)
mainRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin)
mainRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin)
mainRouter.get("/search",search)


export default mainRouter
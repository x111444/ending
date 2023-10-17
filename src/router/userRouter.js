import express from "express";
import {getJoin,postJoin,getLogin,postLogin} from "../constroller/userControllers"
import { publicOnly } from "../middlewares";
const mainRouter = express.Router()


mainRouter.get("/",home)
mainRouter.get("/search",search)
mainRouter.post("/logout").all(privateOnly)
mainRouter.route("/join").all(publicOnly).get(getJoin).post(postJoin)
mainRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin)




export default mainRouter
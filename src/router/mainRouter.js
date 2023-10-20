import express from "express";
import {home,getSignup ,postSignup ,getLogin,postLogin,search} from "../constroller/userController"
import { publicOnly,privateOnly } from "../middlewares";
const mainRouter = express.Router()


mainRouter.get("/",home)
mainRouter.get("/search",search)
mainRouter.post("/logout").all(privateOnly)
mainRouter.route("/join").all(publicOnly).get(getSignup).post(postSignup)
mainRouter.route("/login").all(publicOnly).get(getLogin).post(postLogin)




export default mainRouter
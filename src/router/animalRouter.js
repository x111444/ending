import express from "express";
import {getJoin,postJoin,getLogin,postLogin,getSerch,postSerch} from "../constroller/animalController"
import { publicOnly,privateOnly } from "../middlewares";
const animalRouter = express.Router()

 animalRouter.get("/:id(\\d+)").all(privateOnly)

 animalRouter.get("/").all(privateOnly)
 animalRouter.get("/").all(privateOnly)

 animalRouter.get("/").all(privateOnly)
 animalRouter.get("/").all(privateOnly)


export default animalRouter
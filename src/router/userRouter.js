import express from "express";
import {getEdit,postEdit} from "../constroller/userController"
import { publicOnly,privateOnly } from "../middlewares";
const userRouter = express.Router()



userRouter.post("/Edit").all(privateOnly).get(getEdit).post(postEdit)





export default userRouter
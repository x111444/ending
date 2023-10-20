import express from "express";
import morgan from "morgan";

import mainRouter from "./router/mainRouter";
import animalRouter from "./router/animalRouter";
import userRouter from "./router/userRouter";
import tradeRouter from "./router/tradeRouter";
import communityRouter from "./router/communityouter";

import session from "express-session";
import { localsMiddleware } from "./middlewares";
import MongoStore from "connect-mongo";

// main,user video 로  이루어진 라우터 설계

const app = express()
const logger = morgan(`dev`)
app.set(`view engine`,`pug`)
app.set("views", process.cwd() + "/src/views");
console.log(process.env.DB_URL)
app.use(logger)
app.use(express.urlencoded({extends:true}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create( {mongoUrl:  process.env.DB_URL,})
  }))

app.use(localsMiddleware)

app.use("/",mainRouter)
app.use("/user",userRouter)
app.use("/animal",animalRouter)
app.use("/trade",tradeRouter)
app.use("/community",communityRouter)


export default app
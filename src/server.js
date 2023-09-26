import express from "express";
import morgan from "morgan";
import animalRouter from "./router/animalRouter";
import userRouter from "./router/userRouter";
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

app.use("/api",userRouter)
app.use("/api/animal",animalRouter)


export default app
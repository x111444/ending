import mongoose from "mongoose";
import bcrypt from "bcrypt"


const  userSchema = new mongoose.Schema({
       ImgSrc: String,
       user_id: {type:String,required: true},
       animals: {type:Array,required: true}
    },
  );



const User = mongoose.model("User",accountSchema)

export default User
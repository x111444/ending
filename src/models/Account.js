import mongoose from "mongoose";
import bcrypt from "bcrypt"


const  userSchema = new mongoose.Schema({
       ImgSrc: String,
       onlySocial:{type:Boolean,default:false,required: true},
       user_id: {type:String,required: true},
       password: {type:String,required: true},
       
    },
  );



 userSchema.pre("save", async function()
 {
    this.password = await bcrypt.hash(this.password,5)
 })

const User = mongoose.model("User",accountSchema)

export default User
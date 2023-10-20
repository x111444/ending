import mongoose from "mongoose";


const  commentSchema = new mongoose.Schema({
       src_id:{type:String,required:true},
       user_id:{type:String,required:true},
       comment:{type:String,required:true},
    },
  );



const Comment = mongoose.model("User",commentSchema)

export default Comment
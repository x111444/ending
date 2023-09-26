import mongoose from "mongoose";



const  eventSchema = new mongoose.Schema({
       ImgCrop: String,
       birth: String,
       user_id: {type:String,required: true},
       name: {type:String,required: true},
       sex:  {type:String,required: true}
    },
  );
const Event = mongoose.model("event",eventSchema)

export default Event
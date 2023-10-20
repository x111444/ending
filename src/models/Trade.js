import mongoose from "mongoose";

const  tradeSchema = new mongoose.Schema({
       imgCrops: {type:Array,default:[],required: true},
       is_clear:{type:Boolean,default:false,required: true},
       user_id: {type:String,required: true},
       title: {type:String,required: true},
       price:{type:Number,required:true},
       content:{type:String,required:true},
    },
  );





const Trade = mongoose.model("Animal",tradeSchema)

export default Trade
import mongoose from "mongoose";



const  animalSchema = new mongoose.Schema({
       imgCrop: String,
       birth: String,
       user_id: {type:String,required: true},
       name: {type:String,required: true},
       sex:  {type:String,required: true}
    },
  );





const Animal = mongoose.model("Animal",animalSchema)

export default Animal

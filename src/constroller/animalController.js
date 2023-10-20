import Animal from "../models/Animal";
import User from "../models/User";



export const myPage = (req,res) =>{
    return res.render()
}


export const getAnimal = async (req,res)=>{
    const {user_id, animal_name} = req.query
    try{
       animal = await Animal.findOne({user_id,name:animal_name})
       if(animal)
       {
              return res.status(200).sand(animal)
       }
       else{
        return res.status(500).sand("no animal")
       }
    }
    catch(err)
    {
        return res.status(500).sand("?")
    }

}


export const gatAllAnimal = async (req, res) =>{
    const {user_id} = req.query
    try{
       animals = await Animal.find({user_id})
       if(animals)
       {
              return res.status(200).sand(animals)
       }
       else{
        return res.status(500).sand("no animal")
       }
    }
    catch(err)
    {
        return res.status(500).sand("?")
    }
}




export const postAnimal = async  (req, res) => {
    const { user_id, animal_name, birth,sex} = req.body;
    const imgCrop = file ? file.path : '';
    const ok = await Animal.exists({ user_id,name:animal_name })

    if (ok) {
        return res.status(409).send('animal already exists');
    }
    else {
        User.updateOne({ user_id:  user_id }, { $push: { animals: animal_name } })
                .catch((err) => {
                res.status(501).send('mongo error in update');
                console.log('mongo error in update', err);
                return;
        });  
        await Animal.create(
            {
                user_id, 
                name: animal_name, 
                birth,
                sex, 
                data:[],
                weights:[],
                imgCrop 
            }
        )
        return res.status(200).send('clear add animal');
    }

}

export const delAnimal = async (req,res) =>{
     const {user_id, animal_name} = req.body
     try{     
      User.updateOne({ user_id }, { $pull: { animals: animal_name } })
      Animal.deleteOne({user_id,animal_name})
      return res.status(200).send("del clear")
     }catch
     {
        return res.status(500).send("del error")
     }
}


export const updateAnimal = async (req, res) =>{
    const { user_id, animal_name, birth,sex} = req.body;
    console.log(req.body)
    console.log(req.file)
    const imgCrop = file ? file.path : '';
    animal = await Animal.updateOne({ user_id,name:animal_name },{
        birth,
        sex,
        imgCrop
    })
    
}


export const addWeight = async (req,res) =>{
   const {user_id,animal_name,weight} = req.body
   try{
     await Animal.updateOne( { user_id: user_id, name: animal_name },{$push:{weights:weight}})
   }
   catch
   {
    res.status(501).send("no animal")
   }

}

export const delWeights = async(req,res) =>{
    const {user_id,animal_name,weight} = req.body
   try{
     await Animal.updateOne( { user_id: user_id, name: animal_name },{$pull:{weights:weight}})
   }
   catch
   {
    res.status(501).send("no animal")
   }
}

export const addData = async(req,res) =>{
   const {user_id,animal_name,data} = req.body
   try{
     await Animal.updateOne( { user_id: user_id, name: animal_name },{$push:{data:data}})
   }
   catch
   {
    res.status(501).send("no animal")
   }
}

export const delData = async(req,res) =>{
   const {user_id,animal_name,data} = req.body
   try{
     await Animal.updateOne( { user_id: user_id, name: animal_name },{$pull:{data:data}})
   }
   catch
   {
    res.status(501).send("no animal")
   }
}


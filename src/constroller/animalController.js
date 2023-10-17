import Animal from "../models/Animal";
import User from "../models/User";





export const getAnimal = (req,res)={

}

export const postAnimal = async  (req, res) => {
    const { user_id, animal_name, birth,sex, data} = req.body;
    console.log(req.body)
    console.log(req.file)
    const imgCrop = file ? file.path : '';
    const ok = await Animal.exists({ user_id,animals })

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
                data,
                imgCrop 
            }
        )
        return res.status(200).send('clear add animal');
    }

}

export const addWeight = async (req,res) =>{

}

export const delWeights = async =>(req,res) =>{

}

export const addData = async(req,res) =>{

}

export const delData = async(req,res) =>{

}


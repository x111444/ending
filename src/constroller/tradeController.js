import Trade from "../models/Trade"
import Comment from "../models/Comment"

const LIMIT_TRADE_LONG = 16
const LIMIT_TRADE_SHOT = 5
const LIMIT_COMMENT =30

export  const tradePage = (req,res) =>{
      res.render()
}

export const getTrads = async (req,res) =>{   
    const {word, filter,page} = req.query
    let limit = 0

    try{
     if(filter == "title")
     {
       const data = await Trade.find({title:word}).skip(LIMIT_TRADE_LONG *page).limit(LIMIT_TRADE_LONG )
       return res.status(200).send(data)
     }
     else if(filter =="user_id")
     {
        const data = await Trade.find({user_id:word}).skip().limit()
        return res.status(200).send(data)
     }
     else if(filter =="all")
     {
        const data_1 = await Trade.find({title:word}).skip().limit()
        const data_2 = await Trade.find({user_id:word}).skip().limit()
        const data = [...data_1, ...data_2];
        return res.status(200).send(data)
     }
     else
     {
        const data = await Trade.find().skip().limit();
     }
    }
    catch{
       return res.status(500).send("err")
    }

}

export const  getTrade = async (req,res) =>{
    try{
    const {id} = req.query
    data = await Trade.findById(id)
    return res.status(200).send(data)
    }
    catch
    {
        return res.status(500).send(data)
    }
}

export const  postTrade = async (req,res) =>{
    try{
      const {user_id,title,content,price} = req.body 
      let imgCrops = []
      for(const file of req.files)
      {
         imgCrops.push(file.path)
      }      
      await Trade.create({
         user_id,
         title,
         content,
         price,
         imgCrops
      })
      return res.status(200).send("clear")
    }
    catch(err){
        return res.status(500).send(err.message)
    }
}

export const getComments = async (req,res) =>{
      try{
           const {id} = req.query
           const comment_data =[]
           const comment_oris =await Comment.find({src_id:id})
           for(const comment of comment_oris)
           {
              comment_data.push(comment.comment)
              const sub_comments = await Comment.find({src_id:comment._id})
              comment_data.push(...sub_comments)
           }
           return res.status(200).send(comment_data)
      }
      catch{
          return res.status(500).send("err")
      }
}

export const postComment = async (req,res) =>{
     try{
         const {id,user_id,comment} = req.body
         Comment.create(
            {
                src_id:id,
                comment,
                user_id
            }
         )
      }
      catch{
        
      }
}
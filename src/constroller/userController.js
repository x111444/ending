import User from "../models/User";
import bcrypt from "bcrypt"


export const postJoin =  async (req,res) => {
    const { user_id, user_pw, user_email, user_name, phone_number } = req.body;
    const user_lv =1
    const exsits =  await User.exists({$or: [{user_id},{user_email}]} )
    if(exsits)
    {
      return res.status(400).render("join",{pageTitle:"Join",errorMessage:"This username/email is already taken."})
    }
    await User.create(
     {
        user_id, 
        user_pw, 
        user_email, 
        user_name, 
        phone_number,
        user_lv  
     }
    )
    res.status(200).sand("signup clear")
    //res.redirect("/login")
 }
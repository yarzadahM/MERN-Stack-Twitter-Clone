import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateTokenAndSetCookie} from '../lib/utils/generateToken.js'

export const signup=async (req,res)=>{
try {
    const {username,fullName,email,password}=req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({error:"Invalid email format"})
    }
    const existingUser=await UserModel.findOne({username})
if(existingUser){
    return res.status(400).json({error:"UserName is already exist"})
}
const existingEmail=await UserModel.findOne({email})

if(existingEmail){
    return res.status(400).json({error:"Email is already exist"})
}
const salt=await bcrypt.genSalt(10);
const hashPassword=await bcrypt.hash(password,salt);
    const newUser=new UserModel({
        fullName,
        username,
        email,
        password:hashPassword
    })
    if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
        followers:newUser.followers,
        following:newUser.following,
        profileImg:newUser.profileImg,
        coverImg:newUser.coverImg
        });
    }else{
res.status(400).json({error:"Invalid user data"})
    }
} catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({error:"Internal Server Error"})

}
}
export const login=async (req,res)=>{
    res.json({
        data:"login endpoint"
    })
}
export const logout=async (req,res)=>{
    res.json({
        data:"logout endpoint"
    })
}
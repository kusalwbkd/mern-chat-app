import { StatusCodes } from "http-status-codes"
import User from "../models/User.js"

export const getUsers=async(req,res)=>{
   const filterdUsers=await User.find({_id:{'$ne':req.user.userId}}).select("-password")
   res.status(StatusCodes.OK).json({filterdUsers})
}
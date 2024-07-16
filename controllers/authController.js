import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register=async(req,res)=>{
    const {username,gender } = req.body;
    const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  req.body.profilePic=gender === "male" ? boyProfilePic : girlProfilePic
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: 'user created' });

}

export const login=async(req,res)=>{
  const user=await User.findOne({'$or':[{username:req.body.username},{email:req.body.username}]})
  if(!user){
    throw new NotFoundError('user does nor exist')
  }
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

    if(!isValidUser){
        throw new UnauthenticatedError('invalid password')
    }

    const token = createJWT({ userId: user._id});

    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });
    user.password=null
    res.status(StatusCodes.OK).json({ msg: 'user logged in' ,user});
}



export const logout=async(req,res)=>{
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
      });
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}
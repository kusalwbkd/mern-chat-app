import { StatusCodes } from "http-status-codes";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { BadRequestError } from "../errors/customErrors.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessages = async (req, res) => {
   
   
  
    const{id:receiverId}=req.params
 const senderId=req.user.userId

 if(receiverId === senderId){
   throw new BadRequestError('you can not message your self')
 }
    let conversation=await Conversation.findOne({
        participants:{'$all':[senderId,receiverId]}
    })

    if(!conversation){
      conversation=await Conversation.create({
        participants:[senderId,receiverId]
      })
    }

    req.body.receiverId=receiverId,
    req.body.senderId=senderId

    const msg=await Message.create(req.body)
    if(msg){
      conversation.messages.push(msg._id)
    }
    await conversation.save()

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
			
			io.to(receiverSocketId).emit("newmsg", msg);
		}
    res.status(StatusCodes.CREATED).json({msg})
};

export const getMessages = async (req, res) => {
	
    const conversation=await Conversation.findOne({
        participants:{'$all':[req.user.userId,req.params.id]}
    }).populate("messages")

    if(!conversation){
        res.status(StatusCodes.OK).json([])
    }
   const messages=conversation.messages
    res.status(StatusCodes.OK).json({messages})
};
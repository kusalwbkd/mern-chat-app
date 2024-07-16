import React, { useState } from 'react'
import Conversation from './Conversation'
import { getRandomEmoji } from '../utils/emojis';
import useGetConversation from '../hooks/useGetConversation';

const Conversations = () => {
	const { conversations,loading } = useGetConversation();
	


  return (
    <div className='py-2 flex flex-col overflow-auto'>
     			{conversations?.map((conversation,index)=>{
					return(
                      <Conversation
					  key={conversation?._id}
					  conversation={conversation}
					  emoji={getRandomEmoji()}
					  lastIdx={index === conversations.length - 1}
					 
					 
					  />
					)
					

				})}
				{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
     		</div>


  )
}

export default Conversations
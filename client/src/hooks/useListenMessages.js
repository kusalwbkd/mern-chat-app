import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext';
import { useConversationContext } from '../context/ConversationContext';
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
	const { messages, setMessages } = useConversationContext();

    useEffect(() => {
		socket?.on("newmsg", (msg) => {
			msg.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, msg]);
		});

		return () => socket?.off("newmsg");
	}, [socket, setMessages, messages]);
}

export default useListenMessages
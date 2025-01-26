import React from 'react'
import { User } from '../../types/User'

interface Props {
    typing: {isTyping: boolean, receiver: string},
    receiver: User | null,
    currentUser: User | null,
}
const Typing = ({typing, receiver, currentUser}: Props) => {
    return (
        <>
            {typing.isTyping && typing.receiver !== receiver?._id && (
                <div className="typing-indicator flex items-center space-x-2 text-sm text-gray-500 mt-2">
                    <span>{currentUser?.name} is typing</span>
                    <div className="dot-animation flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Typing
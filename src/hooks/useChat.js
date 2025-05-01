import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export const useChat = () =>{
    const context = useContext(ChatContext)
    if(!context){
        throw new Error('el hook useChat debe ser utilizado en un ChatProvider')
    }

    return context
}
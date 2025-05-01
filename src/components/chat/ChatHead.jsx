import { useChat } from "../../hooks/useChat"

export default function ChatHead() {
    const { state } = useChat()
    const { activeContact } = state
    return (
        <div className='chatHeader'>
            <div className='userPhoto'></div>
            <div className='userInfo'>
                <h2 className='no-margin text-left'>{activeContact.userName}</h2>
                <p className='no-margin'>{activeContact.email}</p>
            </div>
        </div>
    )
}

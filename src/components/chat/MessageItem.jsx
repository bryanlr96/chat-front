import { useChat } from "../../hooks/useChat"


export default function MessageItem({ message }) {
    const { state } = useChat()
    const { user } = state
    return (
        <div className={user.id === message.senderId ? 'emit' : 'recived'}>
            <p className="message">{message.message}</p>
            <span className="hour">{message.dateStamp}</span>
        </div>
    )
}

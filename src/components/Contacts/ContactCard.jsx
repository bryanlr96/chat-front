import { useChat } from "../../hooks/useChat"



export default function ContactCard({contact}) {

    const { dispatch } = useChat()
    
    const handleClick = () => {
        dispatch({type: 'ADD_ACTIVE_CONTACT', payload: contact})
    }
    return (
        <div className='contactCard' onClick={handleClick}>
            <div className="imageContact"></div>
            <div>
                <p className='no-margin'>{contact.userName}</p>
                <span className='no-margin'>{contact.email}</span>
            </div>
        </div>
    )
}

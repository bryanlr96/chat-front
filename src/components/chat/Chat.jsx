import { useState, useEffect } from 'react'
import ChatHead from './ChatHead'
import { useChat } from '../../hooks/useChat'
import './index.css'
import MessageItem from './MessageItem'

export default function Chat() {

  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState([])
  const { socket, state } = useChat()
  const { activeContact } = state
  
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('send-message', { message: messageText, contactId: activeContact.contactID })
    setMessageText('')
  }

  useEffect(() => {
    //evitar errores si aun no esta lsito
    if (!socket) return;
    // Emitir la solicitud para obtener todas las requests cuando el componente se monta
    socket.emit('getAllMessages', {contactId:activeContact.contactID});

    // Escuchar la respuesta con las solicitudes
    const handleAllMessages = (messages) => {
      setMessages(messages);
    };

    socket.on('allMessages', handleAllMessages);


    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('allMessages', handleAllMessages);
    };
  }, [socket, activeContact]);

  return (
    <div className='chat'>
      <ChatHead />
      <div className='chatContainer'>
        {
          messages.map(message=>(
            <MessageItem message={message}/>
          ))
        }
      </div>
      <form className='chatDisplay'>
        <input type="text" id='messageToSend' name='messageToSend' value={messageText} onChange={e => setMessageText(e.target.value)} />
        <button onClick={e => handleSubmit(e)}>
          <img width={20} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3klEQVR4nL3VsUqCURjGcTManAQbG4JAugOXHFsDr+C7BcdWR6HJsQYHL0FvwZoaamgIHJoEFyG+pUV+EZwDEQ2ivt//At7/4TzPe06tFg2eUeA4SpBZoI9GlCCzwgCnUYJMiXu0owSZDWboRAl+M8cNjqIEmdfUvJMoQWaZCtGMEmQ+McLZf4I7jDHFE96xthtfeMDltvk0cIFuCrdIyzjEJLXrJ/i3P4fKzbuOFlzFX5EKQt6HD9xG1PQlatHmEU/FJuqxK1Nw5zsN3uLDae01uMov8xE91A86uCq+AUn+O8EZtO0KAAAAAElFTkSuQmCC" alt="paper-plane" />
        </button>
      </form>
    </div>
  )
}

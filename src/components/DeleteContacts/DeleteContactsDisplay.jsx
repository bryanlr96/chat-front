import './index.css'
import { useState, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import DeleteContactCard from './DeleteContactCard';

export default function DeleteContactsDisplay() {
  const [ contacts, setContacts] = useState([])
  const { socket } = useChat();


  useEffect(() => {
    //evitar errores si aun no esta lsito
    if (!socket) return;
    // Emitir la solicitud para obtener todas las requests cuando el componente se monta
    socket.emit('getAllContacts');

    // Escuchar la respuesta con las solicitudes
    const handleAllChats = (contacts) => {
      setContacts(contacts);
    };

    socket.on('allContacts', handleAllChats);


    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('allChats', handleAllChats);
    };
  }, [socket]);

  return (
    <div className='deleteContactDisplay'>
      {
        contacts.length < 1 ? (
          <p>No hay chats disponibles</p>
        ) : contacts.map(contact => (
          <DeleteContactCard key={contact.contactID} contact={contact} />
        ))
      }
    </div>
  )
}

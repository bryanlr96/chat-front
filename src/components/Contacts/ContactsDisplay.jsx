import './index.css'
import { useEffect, useState } from 'react'
import { useChat } from '../../hooks/useChat';
import ContactCard from './ContactCard';


export default function ContactsDisplay() {

  const [contacts, setContantacts] = useState([])
  const { socket } = useChat();


  useEffect(() => {
    //evitar errores si aun no esta lsito
    if (!socket) return;
    // Emitir la solicitud para obtener todas las requests cuando el componente se monta
    socket.emit('getAllContacts');

    // Escuchar la respuesta con las solicitudes
    const handleAllChats = (contacts) => {
      setContantacts(contacts);
    };

    socket.on('allContacts', handleAllChats);


    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('allContacts', handleAllChats);
    };
  }, [socket]);


  return (
    <div className='contactDisplay'>
      {
        contacts.length < 1 ? (
          <p>No hay chats disponibles</p>
        ) : contacts.map(contact => (
          <ContactCard key={contact.contactID} contact={contact} />
        ))
      }
    </div>
  )
}

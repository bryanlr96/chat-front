import { useEffect, useState } from 'react';
import './index.css';
import { useChat } from '../../hooks/useChat';
import RequestCard from './RequestCard';

export default function RequestDisplay() {
  const [request, setRequest] = useState([]);
  const { socket } = useChat();

  useEffect(() => {
    // Emitir la solicitud para obtener todas las requests cuando el componente se monta
    socket.emit('get_allRequest');

    // Escuchar la respuesta con las solicitudes
    const handleAllRequests = (requests) => {
      setRequest(requests);
    };

    socket.on('all_requests', handleAllRequests);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('all_requests', handleAllRequests);
    };
  }, [socket]);

  return (
    <div className='requestDisplay'>
      {request.length < 1 ? (
        <p>No tienes solicitudes</p>
      ) : (
        request.map((req) => (
          <RequestCard key={req.request_ID} request={req} />
        ))
      )}
    </div>
  );
}

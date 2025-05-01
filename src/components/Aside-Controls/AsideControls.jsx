import './index.css'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import ContactsDisplay from '../Contacts/ContactsDisplay';
import RequestDisplay from '../Requests/RequestDisplay';
import DeleteContactsDisplay from '../DeleteContacts/DeleteContactsDisplay';
import { useChat } from '../../hooks/useChat';

export default function AsideControls() {

    const navigate = useNavigate()
    const { socket } = useChat()

    //useState para controlar que componente se muestra y cual no. No lo añado en el reducer porque solo se usa aquí
    const [showContacts, setShowContacts] = useState(true);
    const [showRequests, setShowRequests] = useState(false);
    const [showDeleteContacts, setShowDeleteContacts] = useState(false);

    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('sendRequest', {email: email})
        setEmail('')
    }

    const handleClickLogout = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3000/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const data = await response.json()

            if (data.success) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickChats = () => {
        setShowContacts(true)
        setShowRequests(false)
        setShowDeleteContacts(false)
    }
    const handleClickReq = () => {
        setShowContacts(false)
        setShowRequests(true)
        setShowDeleteContacts(false)
    }
    const handleClickDel = () => {
        setShowContacts(false)
        setShowRequests(false)
        setShowDeleteContacts(true)
    }

    return (
        <div className='sideBarControls'>
            <form className='friendReqform'>
                <input type="text" name='inputFriendReqt' id='inputFriendReq' placeholder='Buscar nuevo amigo' value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={e => handleSubmit(e)}>
                    <img width={20} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3klEQVR4nL3VsUqCURjGcTManAQbG4JAugOXHFsDr+C7BcdWR6HJsQYHL0FvwZoaamgIHJoEFyG+pUV+EZwDEQ2ivt//At7/4TzPe06tFg2eUeA4SpBZoI9GlCCzwgCnUYJMiXu0owSZDWboRAl+M8cNjqIEmdfUvJMoQWaZCtGMEmQ+McLZf4I7jDHFE96xthtfeMDltvk0cIFuCrdIyzjEJLXrJ/i3P4fKzbuOFlzFX5EKQt6HD9xG1PQlatHmEU/FJuqxK1Nw5zsN3uLDae01uMov8xE91A86uCq+AUn+O8EZtO0KAAAAAElFTkSuQmCC" alt="paper-plane" />
                </button>
            </form>
            <div className='btnDisplay'>
                <button onClick={handleClickChats}>Contactos</button>
                <button onClick={handleClickReq}>Solicitudes</button>
                <button onClick={handleClickDel}>Eliminar</button>
                <button onClick={e => handleClickLogout(e)}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABYElEQVR4nN2VW0rDQBiFY0OFgroOKV2EqO9eWi3uoNZS0V2oD+oalOJyxCoqVcHLBkS8vnwy8QTGMpmkyVt/CCT5zpzT/JM/DYKxLmASaFrXUVnXTaPJa94AnocMhwNMPQH1UYxD4Dg2A/qegL6lOwRKWQKOtOATaAETnoASsCltFJJmXrfM5xz8X4B1fx74El7xbeiLRK0ETVQJrP1HeQTKLsGGBOdJvUSVwEy7LiRpugRngm3nIwb+APGOJD0XfBCcLRBQleTeBT8EKwUCKpK8u+Cb4HSQs4AZeby64K1gtUBATR43LtgT3C4QsCuPExdcFzTjH+YwD4EreTSSBu1Ogq0cAV2tHTgHTaJVib6BhRHMF4EfrV1KEx9YIR1fu9SWrmW+l+XXmJHfj9954BLY0RsypaOmDY17Hpln+lxbQcvqZ1oNUtviCSkDa8ApcK1hNIc5N/fMv557Q8emfgHP+pfkrPU26AAAAABJRU5ErkJggg==" alt="shutdown--v1" />
                </button>
            </div>
            {showContacts && (
                <ContactsDisplay />
            )}
            {showRequests && (
                <RequestDisplay />
            )}
            {showDeleteContacts && (
                <DeleteContactsDisplay />
            )}

        </div>
    )
}

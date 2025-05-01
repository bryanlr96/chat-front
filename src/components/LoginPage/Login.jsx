import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from "../../hooks/useChat";

export default function Login() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const navigate = useNavigate()
    const { dispatch } = useChat()

    const handleClick = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch("https://chat-backend-production-654b.up.railway.app/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pass })
            })

            const data = await response.json()
            
            //si se ha podido registrar al usuario
            if(data.success){
                dispatch({ type: "SET_USER", payload: data.user })
                navigate("/home")
            }
            else{//si no se ha podido registrar
                document.getElementById('loginError').innerText = data.message
            }

        } catch (error) {
            console.error('Error en la petición:', error)
        }
    }
    
    return (
        <form id='loginForm'>
            <h2>Login</h2>
            <fieldset>
                <label>Email:</label>
                <input type="email" name="emailLogin" id="emailLogin" value={email} onChange={e => setEmail(e.target.value)} required />
            </fieldset>
            <fieldset>
                <label>Contraseña:</label>
                <input type="password" name="passLogin" id="passLogin" value={pass} onChange={e => setPass(e.target.value)} required />
            </fieldset>
            <button id='loginButton' onClick={e => handleClick(e)}>Iniciar Sesion</button>
            <p id="loginError" className="error"></p>
        </form>
    )
}

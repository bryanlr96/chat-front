import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChat } from '../../hooks/useChat'
export default function Register() {

    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [pass, setPass] = useState('')

    const { dispatch } = useChat()
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${import.meta.env.VITE_URL_BACK}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pass, userName })
            })

            const data = await response.json()

            //si se ha podido registrar al usuario
            if (data.success) {
                dispatch({ type: "SET_USER", payload: data.user })
                navigate('/home')
            }
            else {//si no se ha podido registrar
                console.log('No encontrado')
                document.getElementById('registerError').innerText = data.message
            }

        } catch (error) {
            console.error('Error en la petición:', error)
        }
    }

    return (
        <form id='registerForm'>
            <h2>Registro</h2>
            <fieldset>
                <label>Email:</label>
                <input type="email" name="emailRegister" id="emailRegister" value={email} onChange={e => setEmail(e.target.value)} required />
            </fieldset>
            <fieldset>
                <label>Nombre de Usuario:</label>
                <input type="text" name="userName" id="userName" value={userName} onChange={e => setUserName(e.target.value)} required />
            </fieldset>
            <fieldset>
                <label>Contraseña:</label>
                <input type="password" name="passRegister" id="passRegister" value={pass} onChange={e => setPass(e.target.value)} required />
            </fieldset>
            <button onClick={e => handleClick(e)}>Registro</button>
            <p id="registerError" className="error"></p>
        </form>
    )
}

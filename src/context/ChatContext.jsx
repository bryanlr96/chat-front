import { createContext, useEffect, useReducer, useState } from "react";
import { chatReducer, initialState } from "../reducers/chat-reducer";
import { io } from "socket.io-client";


export const ChatContext = createContext()


export const ChatProvider = ({ children }) => {

    const [state, dispatch] = useReducer(chatReducer, initialState)
    const [socket, setSocket] = useState(null)
    //inicializar el usuario en caso de ser necesario (esto se hace por si el usuario recarga o ya tenia sesion iniciada)
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_url_back}/reload`);
          if (!response.ok) throw new Error("Error al obtener usuario");
  
          const data = await response.json();

          if(data.success){
            dispatch({ type: "SET_USER", payload: data.user });

          }
          
        } catch (error) {
          console.error("No se pudo recuperar el usuario:", error);
        }
      };
  
      fetchUser();
    }, []);
    

    //iniciamos la conexions con socket y la almacenamos en el state socket para hacerla global.
    useEffect(()=>{
      //solo iniciamos la conexion si tenemos usuario
      if(state.user){
        const newSocket = io(process.env.REACT_APP_url_back, {
          query: {userId: state.user.id}
        })

        setSocket(newSocket)

        newSocket.on("connect", ()=>{
          console.log('Conectando socket.io con el ID:' + newSocket.id)
        })

        return () => {
          newSocket.disconnect()
          console.log('Sesion Desconectada')
        }
      }

    },[state.user])

    

    return (
        <ChatContext.Provider value={{
            state,
            dispatch,
            socket
        }}>

            {children}

        </ChatContext.Provider>
    )
}
import React, { useEffect, useState } from 'react'
import { useChat } from '../../hooks/useChat' 

export default function UserCard() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const { state } = useChat()
    const { user } = state

    useEffect(()=> {
        if(user){
            setUserName(user.userName)
            setEmail(user.email)
        }
    },[user])


    return (
        <div className='userCard'>
            <div className='userPhoto'></div>
            <div className='userInfo'>
                <h2 className='no-margin text-left'>{userName}</h2>
                <p className='no-margin'>{email}</p>
            </div>
        </div>
    )
}

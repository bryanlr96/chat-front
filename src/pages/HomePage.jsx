import Aside from '../components/Aside/Aside'
import Chat from '../components/chat/Chat'
import { useChat } from '../hooks/useChat'

export default function HomePage() {

  const { state } = useChat()
  const { activeContact } = state
  return (
    <div className='homePage'>
      <Aside/>
      {
        activeContact.contactID && ( 
          <Chat/>
        )
      }
    </div>
  )
}

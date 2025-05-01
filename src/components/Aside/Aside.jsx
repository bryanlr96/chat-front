import './index.css'
import AsideControls from '../Aside-Controls/AsideControls'
import UserCard from './UserCard'

export default function Aside() {
  return (
    <aside className='sidebar'>
        <UserCard/>
        <AsideControls/>
    </aside>
  )
}



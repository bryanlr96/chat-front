import './index.css'
import { useChat } from '../../hooks/useChat'

export default function DeleteContactCard({ contact }) {
    const { socket } = useChat()

    const handleDelete = () => {
        if(socket){
            socket.emit('delete-contact', {contact_ID : contact.contactID })
        }
    }

    return (
        <div className='deleteContactCard'>
            <div className="imageContact"></div>
            <div className='deleteContactInfo'>
                <p className='no-margin'>{contact.userName}</p>
                <span className='no-margin'>{contact.email}</span>
            </div>
            <button className='no-bg' onClick={handleDelete}>
                <img width={40} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFVUlEQVR4nO2daYgcRRiGn00wG40mHhglCuuFSlx/mFVJNERRMHiQSBQcIYj+8cREjReoiIriickPY6KIEDUjGBAPYhRRIUbwNgseeMZjxRhF3URXN6sjBe9A0WzP9OzO7FbVfA80O9NUzVb121X91Vf1VYNhGIZhGIZhGIZhGIZhGCFxInALcNh4FyR2dgVuADYDA0ClxjEEfAs8DHR5vzER+E5p/gNeA84HOsexXlGyD/BBHRHyjj+AefqdM3TuV2CHl+YX4EFg5jjXMxqe04X7AlgI7Fkn/STgWOAF5fsZ2Bt4Vt+vB6YClwLvZQTcBFwI7DZGdYuOQ3ShtgMHNZjXdVEblf9uYCcwCOyXSTdL3dvvnjDu80rgmCbWJQnO1gV6eYT5L1f+Qf1dVyPtFOAi4K1Mq3Gt6BK1qranpItSHmX+6jG/YL6jgOV63lTzbivQXSbD7sAc4DzgYllUd6llNEuQb4AJDeafDNyo/DtUzqRZKPNzqI61VG6CIG78MRLuUf7HSJxqRat9/IfA0+oqblYruQJ4tAmCOMEPHEH+XYCf9BuzSZiDgX9l+Vxdp28uNfEZ0q+W4gaaRThH+Xppg67KVXR9gbSlJgpSPb7WWKUeLyn9EhKnEeupNEpB/LyzvVH/QB2rq0ut2KXbi8RpRJAZwEmj+D/Z/+F8V6s818paYIs3VhmSz+t9fX+CNmC044ui5InZATxT0B92DW3AWAlSC+cW+Rt4BDjS8/pOkjtlrcr4V8ZrHC3dGf9QiscQsJRIyLNwUjvKREII3VIria5+0RU49fql0GVtB6YBz2e+Ry3IqzIzU2NpbIJ0y6x0hV6RmCgLgH9Ut2VExHxvlciqREQ5y7vRHoixTimJcq7nYrmPiDndu6uW54iyP7AG+EqTVnNrLHxYLz9Ur+7YsUhX0nSBq8OdJIAvyrJhJoLcBNXtukCLNDE0c5gp1c/kDp+qNVd9QE+L0/V4s5q3kRBX5lgmJwDvZM7dpFlFn3la2uNznfryVqYrNTB/ExV5tnspgnOVmEzcopgggeBWEV4AvBt5C9mqOfl9iZgp3jrbPA9pLIJUdGzRYroouV+VcNbL45ELsgl4XZ8/kXUYFdPlYtgpV0oKz5BOxalU1A1HxZkquLurSEQQx1X6vprIyFYkFUFKsZrBJkhgmCCBYYIEhgkSGCZIgFOdzhrZkJiVdVmsQTxdCtL/U+tsUxCkwxutu4Ci6Fijwn+kmbaYBdnguX/6Yo05nK7ZwJSci/3AqUTMHoqq/TFyQQaAp2L29GZJ4RmSFHkVOw64dZi05YDOtZUgoV38csFyR48JEhgmSCSCDBecWbIua/wEyUtbDuhcWz1D8tKWAzpngmCCtBxrIYFhgkQiyAFmZY0PNg4JDBMkMEyQwDBBIhHkFAV6ZgPzVwwTgvZmwVC1ZqZLdmC4SBVzm4dlY0jcvrqLtbdut2IwspG4buX5pxLLBWmerLntWS1Ot1jldusDkmKut91GlqOBt7VhWF+Npf5uR9MXtRfXZq2wb3W6JSr3vSTGoaqYe79HHp2Ex0MqtwtDSIoO3f0V3Zmx8LHKXGRr2ehYrcrdQTyvSaoAP0S+LUguPdoPt18uk5DpkBVW0UYGyfJkAJuTVRo4vk/9rTtuNeOXquxGTeGGxGS9Yae6OK76HqukOdx788BWvcWm6Cb5rWKC9qWvRtkOakumtmGGRugVT5iVGhkfoTe0tZJpeqfhAsXTf+6VxbXg42lDJmok3BvQ8+LaWFe2N9uimSNr5hW5NLa1+OL/plbxhkIlTtNW44ZhGIZhGIZhGIZhGIZhGETJ/3iLPvOWMJBaAAAAAElFTkSuQmCC" alt="full-trash" />
            </button>
        </div>
    )
}

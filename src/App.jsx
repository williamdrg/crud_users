import { useEffect, useState } from 'react'
import './App.css'
import userCRUD from './hooks/userCRUD'
import UsersForm from './components/UsersForm'
import UserCard from './components/UserCard'
import Header from './components/Header'
import Modal from './components/Modal'

function App() {

  const [ users, getUsers, createUser, updateUser, deleteUser ] = userCRUD()
  const [ dataUser, setDataUser ] = useState()
  const [ isShow, setIsShow ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ selectedUserId, setSelectedUserId ] = useState(null)
  const [ titleForm, setTitleForm ] = useState('')
  

  useEffect(() => {
    getUsers('/users')

  }, [])

  console.log('usuario', users)
  return (
    <div>
      <Header
        setIsShow={setIsShow}
        setTitleForm={setTitleForm}
      />
      <UsersForm 
        createUser={createUser}
        dataUser={dataUser}
        setDataUser={setDataUser}
        updateUser={updateUser}
        isShow={isShow}
        setIsShow={setIsShow}
        titleForm={titleForm}
      />

      {
        modal && (
        <Modal 
          setModal={setModal}
          selectedUserId={selectedUserId}
          deleteUser={deleteUser}
        />
      )
      }
      <div className='mt-20 flex justify-center gap-2 flex-wrap max-w-7xl mx-auto'>
      {
        users?.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            setDataUser={setDataUser}
            setSelectedUserId={setSelectedUserId}
            setModal={setModal}
            setIsShow={setIsShow}
            setTitleForm={setTitleForm}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App

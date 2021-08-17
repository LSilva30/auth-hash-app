import { useState } from 'react'
import Signup from './components/Signup'
import 'antd/dist/antd.css'
import Login from './components/Login'
import ProtectedForm from './components/ProtectedForm'

export default function App() {
  const [ user, setUser ] = useState()
  const [ returningUser, setReturningUser ] = useState(false)
  if(!user) {
    return (
      <>
        {!returningUser
          ? <Signup setUser={setUser} setReturningUser={setReturningUser} />
          : <Login setUser={setUser} setReturningUser={setReturningUser} />
        }
      </>
    )
  }
  return (
    <ProtectedForm />
  )
}

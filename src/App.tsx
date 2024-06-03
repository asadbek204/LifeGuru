import { useEffect, useState } from 'react'
import styles from './App.module.css'
import HomePage from '@pages/home/Home'
import LoginPage from '@pages/login/Login'
import TUser from '@types'
import GlobalContext from '@contexts'

const user: TUser = { email: '', name: '', isAuthorized: false }

function App() {
  const [ authorized, setAuth ] = useState(false)
  const [ className, setClassName ] = useState(styles.login)
  useEffect(() => {
    setClassName((authorized)? styles.home: styles.login)
    user.isAuthorized = authorized
  }, [ authorized ])
  return (
    <GlobalContext.Provider value={ { user: user, setAuth: setAuth } }>
      <div className={ className }>
        {
          ( authorized ) ? 
          <HomePage /> :
          <LoginPage />
        }
      </div>
    </GlobalContext.Provider>
  )
}

export default App
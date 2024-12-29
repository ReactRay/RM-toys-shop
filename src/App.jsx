import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/mainStyles.scss'

import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { UserMsg } from './cmps/Usermsg'
import { ToysIndex } from './pages/ToysIndex'

function App() {

  return (
    <div >
      <Router>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/toys" element={<ToysIndex />} />



        </Routes>
      </Router>
      <UserMsg />
    </div>
  )
}

export default App

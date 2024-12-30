import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/mainStyles.scss'

import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { UserMsg } from './cmps/Usermsg'
import { ToysIndex } from './pages/ToysIndex'
import { AddToy } from './pages/AddToy'
import { EditToy } from './pages/EditToy'
import { Details } from './pages/Details'

function App() {

  return (
    <div >
      <Router>

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/toys" element={<ToysIndex />} />
          <Route path="/add" element={<AddToy />} />
          <Route path="/edit/:toyId" element={<EditToy />} />
          <Route path="/details/:toyId" element={<Details />} />




        </Routes>
      </Router>
      <UserMsg />
    </div>
  )
}

export default App

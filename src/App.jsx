import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/mainStyles.scss'
import { UserMsg } from './cmps/Usermsg'
import { Login } from './pages/Login'
import { HomePage } from './pages/HomePage'
import { SignUp } from './pages/SignUp'
import { MondayIndex } from './pages/MondayIndex'
import BoardDetails from './pages/BoardDetails'
function App() {

  return (
    <div >
      <Router>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/index" element={<MondayIndex />} />
          <Route path="/details/:boardId" element={<BoardDetails />} />


        </Routes>
      </Router>
      <UserMsg />
    </div>
  )
}

export default App

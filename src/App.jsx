import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import './styles/mainStyles.scss'

import { SignUp } from './pages/SignUp'
import { Login } from './pages/Login'


function App() {

  return (
    <Router>
      <div >
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App

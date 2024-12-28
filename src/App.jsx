import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/mainStyles.scss'

import { MultiSelect } from './cmps/MultiSelect'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MultiSelect />
    </div>
  )
}

export default App

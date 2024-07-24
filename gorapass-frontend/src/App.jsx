import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ListStamps() {
  const [stamps, setStamps] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/gorapass/stamps")
      .then(response => response.json())
      .then(json => setStamps(json))
      .catch(error => console.error(error));
  }, []);

  console.log(stamps)

  return (
    <div>
      <ul>
        {stamps.map(stamp => {
          return <li>{stamp.stamp_name}</li>
        }) }
      </ul>

    </div>
  )
}

function App() {

  return (
    <div>
      <ListStamps />
    </div>
  )
}

export default App


import {Link} from "react-router-dom"
import { useState, useEffect } from 'react'

const AllStamps = () => {

  const [stamps, setStamps] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/stamps")
      .then(response => response.json())
      .then(json => setStamps(json))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Touch Points</h1>
      <ul>
         {stamps.map(stamp =>
          <li key={stamp.id}>
            <Link to={`/stamps/${stamp.id}`}>{stamp.stamp_name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default AllStamps
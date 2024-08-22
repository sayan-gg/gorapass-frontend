import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"

const OpenStamps = () => {
  const [openStamps, setOpenStamps] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/open_stamps", {
      credentials:'include'})
      .then(response => response.json())
      .then(json => setOpenStamps(json))
      .then(console.log(openStamps[0]))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Open Stamps</h1>
      <ul>
        {openStamps.map(stamp =>
          <li key={stamp.id}>
            <Link to={`/stamps/${stamp.id}`}>{stamp.stamp_name}</Link>
            </li>
        )}
      </ul>
    </div>
  )
}

export default OpenStamps

import {Link} from "react-router-dom"
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'


const AllStamps = () => {

  const [stamps, setStamps] = useState([])

  const csrftoken = Cookies.get('csrftoken')

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/stamps", {
      credentials:'include',
      method:'POST',
      headers: {'X-CSRFToken':csrftoken}
    })
      .then(response => response.json())
      .then(json => setStamps(json))
      .catch(error => console.error(error));
  }, [csrftoken]);

  return (
    <div>
      <h1>List of All Available Stamps</h1>
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
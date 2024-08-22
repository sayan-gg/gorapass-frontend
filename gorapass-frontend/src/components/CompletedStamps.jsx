import { useState, useEffect } from 'react'
import {Link} from "react-router-dom"


const CompletedStamps = () => {
  const [completedStamps, setCompletedStamps] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/completed_stamps", {
      credentials:'include'})
      .then(response => response.json())
      .then(json => setCompletedStamps(json))
      .then(console.log(completedStamps[0]))
      .catch(error => console.error(error));
  }, []);
  return (
    <div>
      <h1>All Completed Stamps</h1>
      <ul>
        {completedStamps.map(stamp =>
          <li key={stamp.id}>
            <Link to={`/stamps/${stamp.id}`}>{stamp.stamp_name}</Link>
            </li>
        )}
      </ul>
    </div>
  )
}



export default CompletedStamps
import { useState, useEffect } from 'react'



const CompletedHikes = () => {
  const [completedHikes, setCompletedHikes] = useState([])



  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/2/completed_hikes", {
      credentials:'include'})
      .then(response => response.json())
      .then(json => setCompletedHikes(json))
      .catch(error => console.error(error));
  }, []);



  return (
    <div>
      <h1>All Completed Hikes</h1>
      <ul>
         {completedHikes.map(hike =>
          <li key={hike.id}>
            {hike.hike_name}
          </li>
        )}
      </ul>
    </div>
  )
}



export default CompletedHikes
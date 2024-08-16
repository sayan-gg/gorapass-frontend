import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'


const Stamp = () => {

  const stampId = useParams().id

  const [stamp, setStamp] = useState({});
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    const url = "http://localhost:8000/gorapass/stamps/" + stampId

    const fetchData = async() => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setStamp(json)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchData();
  }, [stampId]);

  const csrftoken = Cookies.get('csrftoken')

  useEffect(() => {
    const url = "http://localhost:8000/gorapass/hikes"

    const fetchHikes = async() => {
      try {
        const hikeResponse = await fetch(url, {
          credentials:'include',
          method:'POST',
          headers: {'X-CSRFToken':csrftoken},
          body: JSON.stringify({
            "selectors" : [{
              "attribute_name": "stamp_id",
              "attribute_value": parseFloat(stampId),
              "filter_type":"exact"
            }]
           })
          })
        // console.log('hikes', hikeResponse)
        const hikeJson = await hikeResponse.json()
        setHikes(hikeJson)
        // console.log(hikeJson)
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchHikes();
  }, [stampId, csrftoken])

  return (
    <div>
      <h1>{stamp.stamp_name}</h1>
      <ul>Available Hikes</ul>
        {hikes.map(hike => {
          return <li key={hike.id}>{hike.hike_name}</li>
        })}
    </div>


  )
}

export default Stamp
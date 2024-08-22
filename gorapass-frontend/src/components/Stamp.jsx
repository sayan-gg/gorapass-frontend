import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom"

import Cookies from 'js-cookie'


const Stamp = () => {

  const stampId = useParams().id

  const [stamp, setStamp] = useState({});
  const [hikes, setHikes] = useState([]);

  const [stampStatus, setStampStatus] = useState();

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

  useEffect(() => {
    const url = "http://localhost:8000/gorapass/stamps/" + stampId + "/get_status"

    const fetchData = async() => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
        });
        const json = await response.json();
        setStampStatus(json['status'])
      } catch (error) {
        console.log("error", error)
      }
    }
    fetchData();
  }, [stampId]);

  const csrftoken = Cookies.get('csrftoken')

  const updateStatus = () => {
    const newStatus = stampStatus === 'Complete' ? 'Open' : 'Complete'
    console.log('Current status:' + stampStatus)
    console.log('New status:' + newStatus)

    const url = newStatus === 'Complete' ? 'http://localhost:8000/gorapass/users/completed_stamps/add' : 'http://localhost:8000/gorapass/users/completed_stamps/delete'

    const updateStampStatus = async() => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          method:'POST',
          headers: {'X-CSRFToken':csrftoken},
          body: JSON.stringify({
            "stamp_id": parseFloat(stampId)
          })
        })

        console.log(response)

        if (response.ok) {
          setStampStatus(newStatus);
          console.log('reset stamp status!')
        }

      } catch(error) {
        console.log("error", error)
      }
    }

    updateStampStatus()

  }



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
      <p>Stamp status: {stampStatus}</p>
        <Link to="#" onClick={updateStatus}>Mark as {stampStatus === 'Open' ? 'Complete' :'Open'}</Link>
      <ul>Available Hikes</ul>
        {hikes.map(hike => {
          return <li key={hike.id}>{hike.hike_name}</li>
        })}
    </div>


  )
}

export default Stamp
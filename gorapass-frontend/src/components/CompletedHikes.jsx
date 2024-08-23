import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedHikes = () => {
  const navigate = useNavigate();
  const [completedHikes, setCompletedHikes] = useState([])

  useEffect(() => {
    const fetchCompletedHikes = async () => {
      try {
        const response = await fetch("http://localhost:8000/gorapass/users/completed_hikes", {
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (response.status === 200) {
          const json = await response.json();
          setCompletedHikes(json);
        }

        else {
          throw new Error(`Unaccounted for response: ${response.status}`);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchCompletedHikes();
  }, [navigate]);

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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedStamps = () => {
  const navigate = useNavigate();
  const [completedStamps, setCompletedStamps] = useState([])

  useEffect(() => {
    const fetchCompletedStamps = async () => {
      try {
        const response = await fetch("http://localhost:8000/gorapass/users/2/completed_stamps", {
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (response.status === 200) {
          const json = await response.json();
          setCompletedStamps(json);
        }

        else {
          throw new Error(`Unaccounted for response: ${response.status}`);
        }

      } catch (error) {
        console.error(error);
      }
    };

    fetchCompletedStamps();
  }, [navigate]);

  return (
    <div>
      <h1>All Completed Stamps</h1>
      <ul>
          {completedStamps.map(stamp =>
          <li key={stamp.id}>
            {stamp.stamp_name}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CompletedStamps

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/logout")
      .then(response => {
        if (response.ok) {
          handleLogout();
          navigate('/');
        } else {
          console.error('Logout failed')
        }
      })
      .catch(error => console.error(error))

  }, []);



}

export default Logout
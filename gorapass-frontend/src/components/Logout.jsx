import { useEffect } from 'react'

const Logout = ({ handleLogout }) => {

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/logout")
      .catch(error => console.error(error))
      .then(handleLogout)
  }, []);



}

export default Logout
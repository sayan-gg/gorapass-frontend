import { useEffect } from 'react'

const Logout = () => {

  useEffect(() => {
    fetch("http://localhost:8000/gorapass/users/logout")
      .catch(error => console.error(error));
  }, []);



}

export default Logout
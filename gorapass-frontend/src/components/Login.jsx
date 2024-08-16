// import React from 'react';
import {useState} from "react";
import Cookies from 'js-cookie';

 const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    value:"",
    isTouched:false,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submit button pressed. Username: ${username}, Password: ${password.value}`)

    const csrftoken = Cookies.get('csrftoken')
    const url = "http://localhost:8000/gorapass/users/login"

    const loginUser = async() => {
      try {
        await fetch(url, {
          credentials: 'include',
          method: 'POST',
          headers: {'X-CSRFToken':csrftoken, 'content-type':'application/json'},
          body: JSON.stringify({
            'username': username,
            'password': password.value,
          })
        })
      } catch (error) {
        console.log("error", error)
      }
    }
    loginUser();

  }



  return (
    <div>
      <h1>Please Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password.value}
            onChange={(e) => {
              setPassword({ ...password, value: e.target.value });
            }}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;
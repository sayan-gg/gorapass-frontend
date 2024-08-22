import './App.css'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
} from 'react-router-dom'
import { useState, useEffect } from 'react'


import Home from './components/Home'
import AllStamps from './components/AllStamps'
import OpenStamps from './components/OpenStamps'
import CompletedStamps from './components/CompletedStamps'
import Stamp from './components/Stamp'
import RegisterAndLogin from './components/RegisterAndLogin'
import CompletedHikes from './components/CompletedHikes'
import Logout from './components/Logout'



const App = () => {

  // const [token, setToken] = useState();

  // if(!token) {
  //   return (
  //       <RegisterAndLogin />
  //   )
  // }

  const padding = {
    padding: 5
  }


  return (
    <Router>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/stamps">All Stamps</Link>
        <Link style={padding} to="/open_stamps">Open Stamps</Link>
        <Link style={padding} to="/completed_stamps">Completed Stamps</Link>
        <Link style={padding} to="/completed_hikes">Completed Hikes</Link>
        <Link style={padding} to="/register">Sign In</Link>
        <Link style={padding} to="/logout">Sign out</Link>

      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stamps" element={<AllStamps />} />
        <Route path="/open_stamps" element={<OpenStamps />} />
        <Route path="/completed_stamps" element={<CompletedStamps />} />
        <Route path="/stamps/:id" element={<Stamp />} />
        <Route path="/completed_hikes" element = {<CompletedHikes />} />
        <Route path="/register" element = {<RegisterAndLogin />} />
        <Route path="/logout" element = {<Logout />} />
      </Routes>

      <div>
        <i>GoraApp, by NOBS</i>
      </div>

    </Router>
  )
}

export default App

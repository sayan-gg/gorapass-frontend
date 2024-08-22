import Register from './Register'
import Login from './Login'

export default function RegisterAndLogin({ handleLogin }) {
  return (
    <div>
      <Register />
      <Login  handleLogin={handleLogin}/>
    </div>
  )
}
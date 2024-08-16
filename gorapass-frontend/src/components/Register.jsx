import {useState} from "react";
import Cookies from 'js-cookie'

// import {validateEmail} from "../src/utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function Register() {
  const [username, setUsername] = useState("");
  //  const [lastName, setLastName] = useState("");
  //  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
//  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    return (
      username &&
      password.value.length >= 8
    );
 };

  const clearForm = () => {
    setUsername("");
    setPassword({
      value: "",
      isTouched: false,
    });
 };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created! Username: ${username}  Password: ${password.value}`);
    const csrftoken = Cookies.get('csrftoken')
    const url = "http://localhost:8000/gorapass/users/register"

    const registerUser = async() => {
      try {
        await fetch(url, {
          credentials: 'include',
          method:'POST',
          headers: {'X-CSRFToken':csrftoken, 'content-type':'application/json'},
          body: JSON.stringify({
            "username": username,
            "password": password.value
          })
        })
      } catch (error) {
        console.log("error", error)
      }
    }

    registerUser();
    clearForm();
  };

 return (
   <div>
     <form onSubmit={handleSubmit}>
       <fieldset>
         <h2>Sign Up</h2>
         <div className="Field">
           <label>
             Username <sup>*</sup>
           </label>
           <input
             value={username}
             onChange={(e) => {
               setUsername(e.target.value);
             }}
             placeholder="Username"
           />
         </div>
         <div className="Field">
           <label>
             Password <sup>*</sup>
           </label>
           <input
             value={password.value}
             type="password"
             onChange={(e) => {
               setPassword({ ...password, value: e.target.value });
             }}
             onBlur={() => {
               setPassword({ ...password, isTouched: true });
             }}
             placeholder="Password"
           />
           {password.isTouched && password.value.length < 8 ? (
             <PasswordErrorMessage />
           ) : null}
         </div>
         <button type="submit" disabled={!getIsFormValid()}>
           Create account
         </button>
       </fieldset>
     </form>

   </div>
 );
}

export default Register;
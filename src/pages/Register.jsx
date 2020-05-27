import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { registerSuccess, registerFail } from '../redux/actions/authActions'



const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const login = () => {
    const data = {
      username: name,
      email: email,
      password: password
    }

    fetch("https://api-minireseausocial.mathis-dyk.fr/auth/local/register", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then((response) => response.json())
      .then((response) => {
        dispatch(registerSuccess(response))
        history.push("/");
      })
      .catch((error) => {
        dispatch(registerFail())
        alert(error)
      })
  }

  return (
    <div>
      <input type="text" placeholder="username" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={login}>Submit</button>
    </div>
  )
}

export default Register;

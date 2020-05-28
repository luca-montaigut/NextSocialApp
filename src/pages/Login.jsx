import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { loginSuccess, loginFail } from '../redux/actions/authActions'


const Login = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history])

  const login = () => {
    const data = {
      identifier: email,
      password: password
    }

    fetch("https://api-minireseausocial.mathis-dyk.fr/auth/local/", {
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
        dispatch(loginSuccess(response))
        history.push("/");
      })
      .catch((error) => {
        dispatch(loginFail())
        alert(error)
      })
  }

  return (
    <div>
      {!isAuthenticated &&
        <>
          <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button onClick={login}>Submit</button>
        </>
      }
      {isAuthenticated &&
        <>
          <h1>connexion réussi !</h1>
        </>
      }
    </div>
  )
}

export default Login;

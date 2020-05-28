import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Layout } from 'antd';
import { Typography } from 'antd';

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

  const login = (e) => {
    e.preventDefault()
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
        alert("Mauvais email ou mot de passe")
      })
  }

  const { Header, Content } = Layout;
  const { Title } = Typography;

  return (
    <>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
        <Title>Login</Title>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
          <div className="form-box">
            <form onSubmit={login}>
              <input type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Your unforgettable password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="submit" className="btn-submit" />
            </form>
          </div>
        </div>
      </Content>
    </>
  )
}

export default Login;

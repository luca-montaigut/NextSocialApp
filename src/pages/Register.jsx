import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Layout } from 'antd';
import { Typography } from 'antd';

import { registerSuccess, registerFail } from '../redux/actions/authActions'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const newRegister = (e) => {
    e.preventDefault()
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

  const { Header, Content } = Layout;
  const { Title } = Typography;


  return (
    <>
      <Header className="site-layout-sub-header-background" style={{ padding: 0, textAlign: "center" }}>
        <Title>Register</Title>
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, height: "100%" }}>
          <div className="form-box">

            <form onSubmit={newRegister}>
              <input type="text" placeholder="Your fancy username" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Your email (for spamming you a lot of course)" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password (as weak as possible, our security is shitty as fuck anyway)" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="submit" className="btn-submit" />
            </form>
          </div>
        </div>
      </Content>
    </>
  )
}

export default Register;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OtherUser from './pages/OtherUser';

import { loadUser } from './redux/actions/authActions'

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('token')) {
      fetch("https://api-minireseausocial.mathis-dyk.fr/users/me", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadUser(response))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch])

  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Switch>
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/register" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
        <AuthRoute path="/user/:userId" component={OtherUser} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>

  )
}

export default App;

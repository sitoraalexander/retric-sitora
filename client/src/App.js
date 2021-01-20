import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Comments from './pages/Comments';
import { Container } from './components/Grid';
import Comment from './pages/Comment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SignIn from './pages/SignIn';
import NoMatch from './pages/NoMatch';
import Head from './components/Head';
import userAPI from './utils/userAPI';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import "./style.css";
function App() {
  const [userState, setUserState] = useState({});

  useEffect(() => {
    // auth user on first render
    authenticate();
  }, []);

  //user authentication
  function authenticate() {
    return userAPI
      .authenticateUser()
      .then(({ data }) => {
        console.log('user:', data);
        setUserState(data);
      })
      .catch((err) => console.log('registered user:', err.response));
  }

  return (
    <Router>
      {/* <Head /> */}
      {/* <Container> */}
        <Switch>
          {/* <Route
            exact
            path='/'
            render={(props) => (
              <Login
                {...props}
                userState={userState}
                setUserState={setUserState}
              />
            )}
          />
          <Route
            exact
            path='/signup'
            render={(props) => (
              <Signup {...props} authenticate={authenticate} user={userState} />
            )}
          /> */}

          <Route exact path='/login' 
             render={(props) => (
              <SignIn
                {...props}
                userState={userState}
                setUserState={setUserState}
              />
            )}
          />
          <Route exact path='/' component={LandingPage} />
          <Route
            exact
            path='/register'
            render={(props) => (
              <Register {...props} authenticate={authenticate} user={userState} />
            )}
          />
          <ProtectedRoute exact path={['/', '/comments']}>
            <Comments {...userState} />
          </ProtectedRoute>
 
          {/* 
          <ProtectedRoute exact path='/comments/:id'>
            <Comment {...userState} />
          </ProtectedRoute> */}
          {/* <Route component={NoMatch} /> */}
        </Switch>
      {/* </Container> */}
      {/* {userState.email ? <Redirect to='/comments' /> : <></>} */}
    </Router>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home, SignUp, SignIn, Dashboard } from './pages'
import { IsUserRedirect, ProtectedRoute } from './helpers/Routes';
import useAuthListener from './hooks/useAuthListener';

const App = () => {
  const { user } = useAuthListener();
  return (
    <Router>
      <Switch>
        <IsUserRedirect user={user} loggedInPath="/dashboard" path="/signin">
          <SignIn />
        </IsUserRedirect>
        <IsUserRedirect user={user} loggedInPath="/dashboard" path="/signup">
          <SignUp />
        </IsUserRedirect>
        <ProtectedRoute user={user} path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
        <IsUserRedirect user={user} loggedInPath="/dashboard" path="/">
          <Home />
        </IsUserRedirect>
      </Switch>
    </Router>
  )
}

export default App

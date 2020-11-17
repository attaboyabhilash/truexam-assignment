import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, SignUp, SignIn, Dashboard } from './pages'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/signin"><SignIn /></Route>
        <Route path="/signup"><SignUp /></Route>
        <Route path="/dashboard"><Dashboard /></Route>
      </Switch>
    </Router>
  )
}

export default App

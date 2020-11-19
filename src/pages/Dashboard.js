import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LeftDashboard from '../components/LeftDashboard'
import RightDashboard from '../components/RightDashboard'
import DummyDashboard from '../components/DummyDashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function Dashboard() {
    const { url } = useRouteMatch();
    
    return (
        <div>
            <Header />
            <div className="dashboard">
                <Router>
                    <LeftDashboard />
                    <Switch>
                        <Route exact path={`${url}`}>
                            <DummyDashboard />
                        </Route>
                        <Route exact path={`${url}/:id`}>
                            <RightDashboard />
                        </Route>
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard

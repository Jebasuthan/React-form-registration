import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Register from '../screens/Register';
import Confirmation from '../screens/Confirmation';
import { AuthContext } from '../context/auth';
import { getStore } from '../utils';

function AuthenticatedRoute ({component: Component, isUserLogined, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => isUserLogined === true 
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLogined: false
    }
  }
  componentDidMount() {
    const user = getStore('user')
    if (user) {
      this.setState({ isUserLogined: true });
    }
  }
  render() {
    const { isUserLogined } = this.state
    return (
      <AuthContext.Provider value={ isUserLogined }>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path='*' exact={true} component={Login} />
            <AuthenticatedRoute path='/home' isUserLogined={isUserLogined} component={Home} />
            <AuthenticatedRoute path='/confirm' isUserLogined={isUserLogined} component={Confirmation} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default Navigation;

import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import {connect} from 'react-redux'
import { fetchUsers } from '../client/store/auth'

class App extends React.Component {
  constructor() {
    super()
    this.attemptLogin = this.attemptLogin.bind(this)
    //this.fetchUsers = this.fetchUsers.bind(this)
  }


  componentDidMount() {
    this.attemptLogin()
  }
  async attemptLogin() {
    const token = window.localStorage.getItem('token');
    this.props.fetchUsers(token)
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    );
  }
  
};

const mapDispatch = (dispatch) => ({
  fetchUsers: (token) => dispatch(fetchUsers(token))
})

export default connect(null, mapDispatch)(App)

import React from 'react';

import Navbar from './components/Navbar';
import Routes from './Routes';
import { connect } from 'react-redux';
import { fetchUsers } from '../client/store/auth';

class App extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<Navbar />
				<Routes />
			</div>
		);
	}
}

const mapDispatch = dispatch => ({
	fetchUsers: token => dispatch(fetchUsers(token)),
});

export default connect(null, mapDispatch)(App);

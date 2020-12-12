import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/user';
import {isAuth} from '../../helpers/auth';
import './TopNavBar.css';

function TopNavBar(props) {

	const logout = () => {
		props.dispatch(logoutUser());
		const highestId = window.setTimeout(() => {
			for (let i = highestId; i >= 0; i--) {
				window.clearTimeout(i);
			}
		}, 0);
		
		props.history.push('/');
	}

	return (
		<header>
			<nav className="container nav-bar__container">
				<Link to="/" className='logo'><h1>MoveGY</h1></Link>
				<div style={{
					display: 'flex',
					justifyContent: 'space-around', 
					alignItems: 'center',
					minWidth: '30%'
				}} className="nav-bar__section">
					<Link to="/blog">Blog</Link>

					{isAuth() ?
						<Fragment>
							{isAuth().role === "Admin" ? <Link to="/admin/users">Admin</Link> : 
							<Link to="/profile">My Account</Link>} 
							<button className="logout" onClick={logout}>Log out</button>
						</Fragment>
						: <Link to="/register_user">Login / Register</Link>
					}
				</div>
				</nav>
		</header>
	)
}

const mapStateToProps = (state) => ({
  user: state.user.user,
	loading: state.user.loading,
	isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(TopNavBar));
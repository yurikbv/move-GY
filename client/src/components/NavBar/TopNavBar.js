import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {ReactComponent as ArrowDown} from "../../assets/img/down-arrow.svg";
import { logoutUser } from '../../store/actions/user';
import {isAuth} from '../../helpers/auth';
import './TopNavBar.css';
import City from "../City/City";

function TopNavBar(props) {
	
	const [showCities, setShowCities] = useState(false);

	const logout = () => {
		props.dispatch(logoutUser(props.history));
	}

	const toggleCityModal = () => setShowCities(!showCities);
	
	return (
		<header>
			<nav className="container nav-bar__container">
				<Link to="/" className='logo'><h1>moveXYZ</h1></Link>
				<span className="choose__city" onClick={toggleCityModal}>
					{localStorage.city && <span style={{marginRight: '10px'}}>{localStorage.city}</span>}
					<ArrowDown style={{fill: 'white', width: '24px'}}/>
				</span>
				{showCities && <City toggleCityModal={toggleCityModal}/>}
				<div style={{
					display: 'flex',
					justifyContent: 'space-around', 
					alignItems: 'center',
					minWidth: '20%'
				}} className="nav-bar__section">
					{/*<Link to="/blog">Blog</Link>*/}
					
					{isAuth() ?
						<Fragment>
							{isAuth().role === "Admin" ? <Link to="/admin/users">Admin</Link> : 
							<Link to="/profile">My Account</Link>} 
							<button className="logout" onClick={logout}>Log out</button>
						</Fragment>
						: <Link to="/register_user" style={{marginLeft: 'auto'}}>Login / Register</Link>
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
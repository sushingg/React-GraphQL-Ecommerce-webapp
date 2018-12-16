import React from "react";
import { Link } from "react-router-dom";
import isLogin from "../../common";

const Navbar = props => {
	const token = isLogin();
	console.log(token);
	var navBtn = "";
	if (token !== null) {
		navBtn = (
			<div className="navbar-item">
				<h3 class="navbar-item">{token.email}</h3>
				<div className="buttons">
					<Link to="/Logout" className="button is-light">
						Log out
					</Link>
				</div>
			</div>
		);
	} else {
		navBtn = (
			<div className="navbar-item">
				<div className="buttons">
					<Link to="/#" className="button is-primary">
						<strong>Sign up</strong>
					</Link>
					<Link to="/Login" className="button is-light">
						Log in
					</Link>
				</div>
			</div>
		);
	}

	return (
		<nav
			className="navbar is-info"
			role="navigation"
			aria-label="main navigation"
		>
			<div className="navbar-brand">
				<Link to="/" className="navbar-item">
					<img
						src="/teche-logo.png"
						alt=" "
						width="112"
						height="28"
					/>
				</Link>
				<Link
					to="/"
					role="button"
					className="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</Link>
			</div>

			<div id="navbarBasicExample" className="navbar-menu">
				<div className="navbar-start">
					<Link to="/home" className="navbar-item">
						Home
					</Link>
					<Link to="/#" className="navbar-item">
						Documentation
					</Link>
					<div className="navbar-item has-dropdown is-hoverable">
						<Link to="/#" className="navbar-link">
							More
						</Link>

						<div className="navbar-dropdown">
							<Link to="/#" className="navbar-item">
								About
							</Link>
							<Link to="/#" className="navbar-item">
								Jobs
							</Link>
							<Link to="/#" className="navbar-item">
								Contact
							</Link>
							<hr className="navbar-divider" />
							<Link to="/#" className="navbar-item">
								Report an issue
							</Link>
						</div>
					</div>
				</div>

				<div className="navbar-end">{navBtn}</div>
			</div>
		</nav>
	);
};
export default Navbar;

import React from 'react';
import {  Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
  } from 'reactstrap';
import isLogin from '../../common'


export default class Example extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
		  isOpen: false
		};


	}
	toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	}
	

  render() {
	const login = isLogin()
	var email
	var navBtn = ''
	if(login !== null)
	{
		email = login.email
		navBtn = <NavItem>
				<Button tag={Link} to="/logout" color="danger">Log Out</Button>{' '}
			  </NavItem>
	}else{
		navBtn = <NavItem>
		<Button tag={Link} to="/login" color="primary">Login</Button>{' '}
		</NavItem>

	}
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/"><img src="/teche-logo.png" alt=" " width="112" height="28"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/sushingg">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    testDD
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink className="text-dark" href="/">Reset</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
			  <NavItem>
				<NavLink>{email}</NavLink>
			  </NavItem>
			  {navBtn}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
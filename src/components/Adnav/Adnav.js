import React, { Component,useState } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Dropdown 
} from "semantic-ui-react";
import {  Link } from "react-router-dom";
import { Redirect } from 'react-router';
import isLogin from "../../common";

const Adnav =  props => {
  const [visible, setVisible,] = useState(false);
  const login = isLogin();
  console.log(login)
  if (!login) {
    return <Redirect push to="/" />;
  }
  return (
      <Sidebar.Pushable as={Segment}>
        <Menu attached='top' fixed>
          <Menu.Item onClick={() => setVisible(!visible)}>
            <Icon name="sidebar"></Icon> Menu{visible}
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as={Dropdown} text='Options'>
                  <Dropdown.Menu>
                    <Dropdown.Item><i class="setting icon"></i>setting</Dropdown.Item>
                    <Dropdown.Item><i class="sign out icon"></i>Sing out</Dropdown.Item>
                  </Dropdown.Menu>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            
          >
            <Menu.Item as='a'>
             <h4 class="ui grey header">TechE Admin Panel</h4>
             <p>Sign Out</p>
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name="block layout icon"/> Dashboard
            </Menu.Item>
          </Sidebar>
            {props.children}
       </Sidebar.Pushable>


  )
}
export default Adnav;


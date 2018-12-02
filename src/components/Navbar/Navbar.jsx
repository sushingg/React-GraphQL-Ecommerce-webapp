import React, { Component } from 'react'
import {  Link } from "react-router-dom";

import { Button, Dropdown, Menu, Image, Label, Icon, Sidebar, Table, Header, Popup, Rail} from 'semantic-ui-react'
import isLogin from '../../common'
import Login from '../Login/Login';

export default class Example extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
		  isOpen: false,
      visible: false,
		};
	}
  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

	toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	}
	

  render() {
    const { visible } = this.state
  	const login = isLogin()
  	var email
  	var navBtn = ''
  	if(login !== null)
  	{
  		email = <Menu.Item> {login.email } </Menu.Item>
  		navBtn =
  				<Button primary as={Link} to="/logout" >Log Out</Button>

  	}else{
  		navBtn = 
          <Popup
            wide='very'
            trigger={<Button primary >Login</Button>}
            content={<Login/>}
            on='click'
            position='bottom right'
          />
  	}
    var carts = 
      <Table basic='very' celled striped unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='ten'>รายการ</Table.HeaderCell>
            <Table.HeaderCell>จำนวน</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' />
                <Header.Content>
                  Test product
                  <Header.Subheader>detail</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Header as='h4'>
                <Header.Content>
                  999฿
                  <Header.Subheader>25 ชิ้น</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Icon name='plus' color='green'/><br/>
              <Icon name='minus' color='red' />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as='h4' image>
                <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' />
                <Header.Content>
                  Matthew
                  <Header.Subheader>Fabric Design</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>15</Table.Cell>
            <Table.Cell>15</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

  return (

      <Sidebar.Pushable style={{ height: '100%' }}   >
        <Sidebar
          animation='push'
          onHide={this.handleSidebarHide}
          visible={visible}
          width='wide'
          direction='right'
        >
          {carts}
        </Sidebar>
        <Sidebar.Pusher dimmed={visible} ref={this.handleContextRef}>
          <Menu >
            <Menu.Item as={Link} to="/"> <Header as='h2'>TechE</Header></Menu.Item>
            <Menu.Menu position='right'>
              <Popup
                wide='very'
                trigger={<Menu.Item disabled={visible} onClick={this.handleShowClick}>Cart<Label><Icon name='shopping cart'/>#</Label></Menu.Item>}
                content={carts}
                on={['hover', 'click']}
                position='bottom right'
              />
             {email}
              <Menu.Item> {navBtn} </Menu.Item>
            </Menu.Menu>
          </Menu>
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
  
    

    );
  }
}
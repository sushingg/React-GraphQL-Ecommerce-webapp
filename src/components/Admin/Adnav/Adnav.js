import React, { useState } from "react";
import {
  Button,
  //Container,
  Header,
  Icon,
  Menu,
  //Responsive,
  Segment,
  //Sidebar,
  //Visibility,
  //Input,
  //Popup,
  //Label,
  //Grid
  //Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import isLogin from "../../../common";
//onClick={(e, { name }) => setActiveItem(name)}

const Adnav = props => {
  const [activeItem, setActiveItem] = useState("");
  const login = isLogin();
  console.log(login)
  if (!login) {
    return <Redirect push to="/" />;
  }else if(!login.admin){
    return <Redirect push to="/" />;
  }
  return (
    <>
      <div className="admin_menu">
        <Menu borderless compact inverted vertical fluid>
          <Menu.Item
          >
            <Header inverted as="h4">Menu</Header>
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin"
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Header inverted as="h4">Dashboard</Header>
          </Menu.Item>
          <Menu.Item>
            Products
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/addproduct"
                name="padd"
                active={activeItem === "padd"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                Add
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/admin/listproduct"
                name="plist"
                active={activeItem === "plist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Orders
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/order"
                name="olist"
                active={activeItem === "olist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Cetegories
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/wip"
                name="cadd"
                active={activeItem === "cadd"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                Add
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/admin/wip"
                name="clist"
                active={activeItem === "clist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            Users
            <Menu.Menu>
              <Menu.Item
                as={Link}
                to="/admin/wip"
                name="ulist"
                active={activeItem === "ulist"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                List
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/admin/wip"
                name="uedit"
                active={activeItem === "uedit"}
                onClick={(e, { name }) => setActiveItem(name)}
              >
                Edit
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>Settings</Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/wip"
            name="setting"
            active={activeItem === "setting"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Icon name="settings" />
            General settings
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/admin/wip"
            name="gswtting"
            active={activeItem === "gswtting"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Icon name="users" />
            Account Settings
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/logout"
            name="logout"
            active={activeItem === "logout"}
            onClick={(e, { name }) => setActiveItem(name)}
          >
            <Icon name="sign out" />
            Logout
          </Menu.Item>
        </Menu>
      </div>
      <div className="admin_seg">
      <Menu>
          <Menu.Item as={Link} to="/admin">
            <Header as="h3">TechE Administrator Dashboard ✔</Header>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/">
              Back to shop
            </Menu.Item>
            <Menu.Item as={Link} to="/logout">
              <Button animated basic color='red'>
                <Button.Content visible>Logout</Button.Content>
                <Button.Content hidden>
                  <Icon name='sign out' />
                </Button.Content>
              </Button>
            </Menu.Item>
          </Menu.Menu>
      </Menu>
        <Segment padded basic>
          <Segment clearing>

            {props.children}
          </Segment >
        </Segment>
        
      </div>
      
    </>
  );
};
export default Adnav;

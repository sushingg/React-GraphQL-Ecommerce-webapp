import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  //Sidebar,
  Visibility,
  Input,
  Popup,
  Label,
  Dropdown ,
  Grid
} from "semantic-ui-react";
import isLogin from "../common";
import Login from "./Login/Login";
import Cart from "./Cart/CartSummary";
import { CartContext } from "./CartContext";
import Slide from './Slide/Slide';
import Category from './Category/Categories';
/* eslint-disable react/no-multi-comp */


/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    var email;
    var navBtn;
    const login = isLogin();
    if (login !== null) {
      email = <span>{login.email}</span>;
      navBtn = (
                <Dropdown  direction='left' trigger={email} icon='user' labeled floating>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/cart"><Icon name='shopping cart' /> Cart</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/checkout"><Icon name='check square outline' /> Check out</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/"><Icon name='list' /> My Orders</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/admin"><Icon name='settings' /> Setting</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/logout" ><Icon name='power off' /> Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>


      );
    } else {
      navBtn = (
        <Popup
          wide="very"
          trigger={
            <Button
              animated='fade'
              as="a"
              inverted={!fixed}
              primary={fixed}
              style={{ marginLeft: "0.5em" }}
            >
              <Button.Content visible>Login</Button.Content>
              <Button.Content hidden><Icon name='sign-in'></Icon></Button.Content>
            </Button>
          }
          content={<Login />}
          on="click"
          position="bottom right"
        />
      );
    }

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 30, padding: "1em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as={Link} to="/" >
                  <h2>TechE</h2>
                </Menu.Item>
                
                <Menu.Item position="right">
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>

                <Popup
                  wide="very"
                  trigger={
                    <Menu.Item>
                      <Button as="div" labelPosition="right">
                        <Button inverted={!fixed} primary={fixed}>
                          <Icon name="shopping cart" />
                          Cart
                        </Button>
                        <Label basic pointing="left">
                          <CartContext.Consumer>
                            {cart => cart.items.length || "0"}
                          </CartContext.Consumer>
                        </Label>
                      </Button>
                    </Menu.Item>
                  }
                  content={Cart}
                  on="click"
                  position="bottom right"
                />
                

                <Menu.Item>{navBtn}</Menu.Item>
              </Container>
            </Menu>
            
          </Segment>
          
          
        </Visibility>
        
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  render() {
    const { children } = this.props;
    

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 10, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary  size="large">
                  <Dropdown item icon='sidebar' >
                    <Dropdown.Menu>
                      <Dropdown.Header>All Categories</Dropdown.Header>
                      <Category/>
                      <Dropdown.Divider />
                      <Dropdown.Header>User</Dropdown.Header>
                      <Dropdown.Item>Login</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item><Header as='h3' inverted>TechE</Header></Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            {children}
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = ({ children }) => (
  <ResponsiveContainer>{children}</ResponsiveContainer>
);
HomepageLayout.propTypes = {
  children: PropTypes.node
};
export default HomepageLayout;
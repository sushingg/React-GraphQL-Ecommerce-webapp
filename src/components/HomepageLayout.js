import PropTypes from 'prop-types'
import {  Link } from "react-router-dom"
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Input,
  Table,
  Popup,
  Label
} from 'semantic-ui-react'
import isLogin from '../common'
import Login from './Login/Login'
import Cart from './Cart/CartSummary'
import { CartContext } from "./CartContext";
/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='TechE'
      inverted
      style={{
        fontSize: mobile ? '2em' : '5em',
        fontWeight: 'normal',
        marginBottom: mobile ? '.5em' : '1.5em',
        marginTop: mobile ? '.5em' : '1.5em',
      }}
    />

  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state
    var email
    var navBtn
    const login = isLogin()
    if(login !== null)
  	{
  		email = <Menu.Item> {login.email } </Menu.Item>
  		navBtn =
  				<Button as='a' as={Link} to="/logout" inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Logout</Button>

  	}else{
  		navBtn = 
          <Popup
            wide='very'
            trigger={<Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Login</Button>}
            content={<Login/>}
            on='click'
            position='bottom right'
          />
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
            textAlign='center'
            style={{ minHeight: 300, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as={Link} to="/" active>
                  TechE
                </Menu.Item>
                <Menu.Item position='right'>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Popup
                  wide='very'
                  trigger={
                    <Menu.Item>
                      <Button as='div' labelPosition='right'>
                        <Button  inverted={!fixed} primary={fixed}>
                          <Icon name='shopping cart' />
                          Cart
                        </Button>
                        <Label basic pointing='left'>
                          <CartContext.Consumer>
                            {cart => (
                             cart.items.length || '0'
                            )}
                          </CartContext.Consumer>
                        </Label>
                      </Button>
                    </Menu.Item>
                  }
                  content={Cart}
                  on='click'
                  position='bottom right'
                />
                {email}
                <Menu.Item >
                  {navBtn}
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              Home
            </Menu.Item>
            <Menu.Item as='a'><Input icon='search' placeholder='Search...' /></Menu.Item>

          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const HomepageLayout = ({children}) => (
  <ResponsiveContainer>
    {children}
  </ResponsiveContainer>
)
HomepageLayout.propTypes = {
  children: PropTypes.node,
}
export default HomepageLayout
import React, { Component } from "react";
import { Grid, Menu, Segment, Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CartContext } from "../../CartContext";
import Profile from "./Profile/Profile";
import MyAddrss from "./MyAddress/MyAddress";
export default class MyMenu extends Component {
  state = { activeItem: "ข้อมูลส่วนตัว" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Container style={{ paddingBottom: "3em", paddingTop: "3em" }}>
        <Segment basic>
          <Grid>
            <Grid.Column width={4}>
              <Header>การตั่งค่า</Header>
              <Menu fluid vertical tabular>
                <Menu.Item
                  name="ข้อมูลส่วนตัว"
                  active={activeItem === "ข้อมูลส่วนตัว"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="ที่อยู่ของฉัน"
                  active={activeItem === "ที่อยู่ของฉัน"}
                  onClick={this.handleItemClick}
                />

                <CartContext.Consumer>
                  {cart =>
                    cart.user && (
                        cart.user.type === "admin" && (
                            <Menu.Item
                              name="จัดการร้านค้าร้านค้า"
                              as={Link}
                              to={"/"+cart.user.type||""}
                            />
                          )
                    )
                  }
                </CartContext.Consumer>
              </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12}>
              <Segment>
                {activeItem === "ข้อมูลส่วนตัว" && <Profile />}
                {activeItem === "ที่อยู่ของฉัน" && <MyAddrss />}
              </Segment>
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

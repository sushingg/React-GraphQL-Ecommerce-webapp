import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Modal,
  Segment,
  Message,
  Container,
  Header,
  Dropdown
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
import isLogin from "../../../common";
import { Redirect } from "react-router";
import Cart from "../../Cart/CartSummary";
import EditAddress from "../EditAddress/EditAddress";
import Complete from "./Complete"
const ADD_ORDER_MUTATION = gql`
  mutation addUserOrderMutation(
    $total: Int!
    $address: Addressinput!
    $products: [OrderProductinput]!
  ) {
    addUserOrder(total: $total, address: $address, orderProduct: $products) {
      id
      total
      status
      createAt
    }
  }
`;
class Checkout extends Component {
  state = {
    addrIndex: null,
    total: null,
    address: [],
    products: null,
    disable: true,
    showError: false,
    isLogged: false,
    completed:false,
    order:undefined
  };
  handleChangeAddress = (value, cart) => {
    if (cart.itemSum > 0) {
      let address = cart.user.address[value];
      var product = JSON.parse(localStorage.getItem("items"))||[]
      try {
        delete address.__typename;
        delete address.id;
        product.map(function(a, i) {
          let res = a
          delete res.description
          delete res.descriptionHtml
          delete res.category
          delete res.subCategory
          delete res.image
          delete res.__typename
          return res;
        })
      } catch {}
      this.setState({
        addrIndex: value,
        total: cart.price,
        address: address,
        products: product,
        disable: false
      });
      console.log(address);
      console.log(this.state.total);
      console.log(cart.items);
      console.log(product);
    }
  };
  render() {
    const { errorMessage, total, address, products } = this.state;
    if(this.state.completed) return <Complete order={this.state.order}/>
    return (
      <Container style={{ padding: "3em 0em" }}>
        <CartContext.Consumer>
          {cart => (
            <>
              {!cart.user && <Redirect to="/cart" />}
              {this.state.showError && (
                <Segment basic textAlign="center">
                  <Message
                    warning
                    onDismiss={e => this.setState({ showError: false })}
                    compact
                  >
                    {errorMessage}
                  </Message>
                </Segment>
              )}
              <Segment padded>
                {cart.user && (
                  <Dropdown
                    style={{ width: "80%" }}
                    placeholder="เลือกที่อยู่เพื่อจัดส่งสินค้า"
                    selection
                    onChange={(e, { value }) =>
                      this.handleChangeAddress(value, cart)
                    }
                    value={this.state.addrIndex}
                    options={cart.user.address.map(function(a, i) {
                      let text =
                        a.mobileNumber +
                        " " +
                        a.firstName +
                        " " +
                        a.lastName +
                        " " +
                        a.addr +
                        " อำเภอ " +
                        a.distric +
                        " จังหวัด " +
                        a.province +
                        " " +
                        a.postcode;
                      return {
                        key: a.id,
                        text: text,
                        value: i
                      };
                    })}
                  />
                )}

                <Modal
                  trigger={
                    <Button style={{ width: "19%" }}>เพิ่มที่อยู่ไหม่</Button>
                  }
                  basic
                  size="small"
                >
                  <>
                    <Segment>
                      <Header as="h3">เพิ่มที่อยู่ไหม่</Header>
                    </Segment>
                    <EditAddress />
                  </>
                </Modal>
              </Segment>
              <Segment padded>
                <Cart />
              </Segment>
              <Segment.Group>
                <Segment padded>
                  <Header as="h3">วิธีการจัดส่ง</Header>
                </Segment>
                <Segment padded textAlign="right">
                  <Mutation
                    mutation={ADD_ORDER_MUTATION}
                    variables={{
                      total,
                      address,
                      products
                    }}
                    onCompleted={data => this._confirm(data, cart)}
                    onError={error => this._error(error)}
                  >
                    {mutation => (
                      <Button
                        color="blue"
                        fluid
                        disabled={this.state.disable}
                        size="large"
                        onClick={mutation}
                      >
                        บันทึก
                      </Button>
                    )}
                  </Mutation>
                </Segment>
              </Segment.Group>
            </>
          )}
        </CartContext.Consumer>
      </Container>
    );
  }

  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async data => {
    const orders = data.addUserOrder;
    console.log(orders);
    localStorage.removeItem("items");
    localStorage.setItem("price", 0);
    localStorage.setItem("itemSum", 0);
    this.setState({completed:true,order:orders})
    //window.location = "/myorders";
  };
  _error = async error => {
    //alert(error);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default Checkout;

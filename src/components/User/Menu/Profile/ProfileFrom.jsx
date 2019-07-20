import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Segment, Message, Container, Form, Header } from "semantic-ui-react";
const GQL_MUTATION = gql`
  mutation updateUser(
    $oldPassword: String!
    $name: String!
    $email: String!
    $password: String!
    $mobileNumber: String!
  ) {
    updateUser(oldPassword: $oldPassword, name: $name, email: $email, password: $password, mobileNumber: $mobileNumber) {
      id
			name
    }
  }
`;
class Checkout extends Component {
  constructor(props){
    super(props);
    this.state = {
      completed: false,
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      oldPassword: "",
    };
  }
  
  componentDidMount() {
    let cart = this.props.cart;
    this.setState({
      name: cart.user.name,
      email: cart.user.email,
      mobileNumber: cart.user.mobileNumber
    });
  }

  render() {
    const { errorMessage, name, email, mobileNumber, password, oldPassword } = this.state;
    const cart = this.props.cart;
    return (
      <Container style={{ padding: "3em 0em" }}>
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
        <Segment basic padded>
          {cart.user && (
            <Form>
              <Header>แก้ไขข้อมูลส่วนตัว</Header>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={name}
                placeholder="ชื่อผู้ใช้"
                onChange={e => this.setState({ name: e.target.value })}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={email}
                placeholder="ที่อยู่อีเมล์"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                value={mobileNumber}
                placeholder="หมายเลขโทรศัพท์"
                onChange={e => this.setState({ mobileNumber: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="รหัสผ่านใหม่"
                value={password}
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="รหัสผ่านปัจจุบัน"
                value={oldPassword}
                type="password"
                onChange={e => this.setState({ oldPassword: e.target.value })}
              />
            </Form>
          )}
        </Segment>
        <Mutation
          mutation={GQL_MUTATION}
          variables={
            {
              oldPassword,
              name,
              email,
              password,
              mobileNumber
            }
          }
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
  _confirm = async (data, cart) => {
    cart.onLogin();
    console.log(data);
    this.setState({ completed: true});
    //window.location = "/myorders";
  };
  _error = async error => {
    //alert(error);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
}

export default Checkout;

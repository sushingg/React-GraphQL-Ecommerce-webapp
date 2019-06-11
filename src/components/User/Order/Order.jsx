import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import {
  Button,
  Form,
  Segment,
  Input,
  Dropdown,
  Message,
  Checkbox,
  Container,
  Header,
  Icon,
  Grid,
  Image,
  Divider
} from "semantic-ui-react";
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2
  })
const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment(
    $id: ID!
  ) {
  createPayment(id:$id){
    message
  }
}
`;

/*const ADD_ORDER_MUTATION = gql`
  mutation AddCategoryMutation($categorySlug: String!, $categorySlug: String!, $tags:[tagsInput]!) {
  addCategory(categorySlug: $categorySlug, categorySlug: $categorySlug, tags: $tags) {
    id
    }
  }
`*/

/*function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}*/
class Checkout extends Component {
  state = {

    showError: false,
    isLogged: false
  };
  componentWillMount() {}
  render() {
    const { errorMessage } = this.state;
    const id = this.props.order.id
    return (
      <div>
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

        <h3 className="ui header">Add Product</h3>
        <Form size="large">
          <Segment basic textAlign="center">
            <Divider horizontal>
              <Header as="h3">
                <Icon name="ordered list" />
                รายการสั่งซื้อของคุณคือ #{this.props.order.id}
              </Header>
            </Divider>
            <Grid columns={3} divided>
              <Grid.Row>
                <Grid.Column>
                  <Header>
                    <Icon name="calendar alternate outline" />
                    ชำระเงินค่าสินค้าภายใน
                  </Header>
                  <Header>
                    {moment
                      .unix(this.props.order.createdAt / 1000)
                      .add(1, "d")
                      .format("llll")}
                    <Header.Subheader>กรุณาชำระเงินก่อนเวลา</Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header>
                    <Icon name="money bill alternate outline" />
                    จำนวนเงินที่ต้องชำระ
                  </Header>
                  <Header>{formatter.format(this.props.order.total)} บาท</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header>สถานะรายการสั่งซื้อ</Header>
                  <Header>
                    รอชำระเงิน
                    <Header.Subheader>กรุณาชำระเงิน</Header.Subheader>
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Mutation
                    mutation={CREATE_PAYMENT_MUTATION}
                    variables={{
                      id
                    }}
                    onCompleted={data => this._confirm(data)}
                    onError={error => this._error(error)}
                  >
                    {mutation => (
                      <Button fluid color="blue" onClick={mutation}>
                        ชำระเงิน.
                      </Button>
                    )}
                  </Mutation>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>
      </div>
    );
  }
  editorText = htmltext => {
    this.setState({
      productDescriptionHtml: htmltext
    });
    console.log(htmltext);
  };
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true };
    });
    console.log(this.state.productPublished);
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false };
    });
  };
  _confirm = async data => {
    const message = data.createPayment;
    console.log(message);
    window.location = message.message;
  };
  _error = async error => {
    //alert(error);
    console.log(this.state.productImage);
    this.setState({ errorMessage: error.message });
    this.toggleError();
  };
  _saveUserData = token => {
    //localStorage.setItem(AUTH_TOKEN, token)
  };
}

export default Checkout;

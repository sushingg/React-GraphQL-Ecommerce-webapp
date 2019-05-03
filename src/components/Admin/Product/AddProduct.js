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
  Checkbox
} from "semantic-ui-react";
import { CartContext } from "../../CartContext";
import isLogin from "../../../common";
import Editor from "../../Editor/Editor";
const ADD_PRODUCT_MUTATION = gql`
  mutation AddProductMutation(
    $productSlug: String!
    $productTitle: String!
    $productPrice: Int!
    $productQuantity: Int!
    $productDescription: String!
    $productDescriptionHtml: String!
    $productPublished: Boolean!
    $productTags: [tagsInput]!
    $productOptions: String!
    $productImage: [imageInput]!
  ) {
    addProduct(
      productSlug: $productSlug
      productTitle: $productTitle
      productPrice: $productPrice
      productQuantity: $productQuantity
      productDescription: $productDescription
      productDescriptionHtml: $productDescriptionHtml
      productPublished: $productPublished
      productTags: $productTags
      productOptions: $productOptions
      productImage: $productImage
    ) {
      id
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
    productSlug: "",
    productTitle: "",
    productPrice: 0,
    productQuantity: 0,
    productDescription: "",
    productDescriptionHtml: "",
    productPublished: false,
    productTags: [],
    productOptions: "",
    productImage: [],
    showError: false,
    isLogged: false,
    value: [],
    stateOptions: [],
    imageOptions: []
  };
  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    });
  };

  handleChange = (e, { value }) => this.setState({ currentValues: value });
  componentWillMount() {
    const login = isLogin();
    if (login !== null) {
      if (!this.state.isLogged)
        this.setState({
          orderEmail: login.email,
          orderFirstname: login.fname,
          orderLastname: login.lname,
          isLogged: true
        });
    }
    console.log(login);
    if (login == null) {
      this.props.history.push(`/`);
    }
  }
  render() {
    const {
      value = [],
      imagevalue = [],
      productSlug,
      productTitle,
      productPrice,
      productDescription,
      productDescriptionHtml,
      productQuantity,
      productPublished,
      productTags,
      productOptions,
      productImage,
      errorMessage,
      stateOptions
    } = this.state;
    return (
      <CartContext.Consumer>
        {cart => (
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
              <Segment basic>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Product Slug"
                    placeholder="productSlug"
                    value={productSlug}
                    onChange={e =>
                      this.setState({ productSlug: e.target.value })
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Product Title"
                    placeholder="productTitle"
                    value={productTitle}
                    onChange={e =>
                      this.setState({ productTitle: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    type="number"
                    label="Price"
                    labelPosition="right"
                    placeholder="productPrice"
                    value={productPrice}
                    onChange={e =>
                      this.setState({ productPrice: parseInt(e.target.value) })
                    }
                  />
                  <Form.Field
                    control={Dropdown}
                    label="Image"
                    placeholder="productImage"
                    value={value}
                    multiple
                    allowAdditions
                    search
                    selection
                    noResultsMessage={null}
                    options={stateOptions}
                    onAddItem={(e, { value }) =>
                      this.setState({
                        stateOptions: [
                          { key: value, value: value, text: value },
                          ...this.state.stateOptions
                        ]
                      })
                    }
                    onChange={(e, { value }) =>
                      this.setState({
                        value,
                        productImage: value.map(e => ({ name: e }))
                      })
                    }
                  />
                  <Form.Field
                    control={Dropdown}
                    label="Tags"
                    placeholder="productTags"
                    multiple
                    selection
                    noResultsMessage={null}
                    options={this.props.category.categoryTags.map((tags,i) => ({key: tags.tag, value: tags.tag, text: tags.tag}))}
                    onChange={(e, { value }) =>
                      this.setState({
                        imagevalue,
                        productImage: value.map(e => ({ name: e }))
                      })
                    }
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    type="number"
                    label="Quantity"
                    labelPosition="right"
                    placeholder="จำนวน"
                    value={productQuantity}
                    onChange={e =>
                      this.setState({
                        productQuantity: parseInt(e.target.value)
                      })
                    }
                  />
                  <Form.Field
                    control={Input}
                    label="Options"
                    placeholder="productOptions"
                    value={productOptions}
                    onChange={e =>
                      this.setState({ productOptions: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Field
                  control={Input}
                  label="Description"
                  placeholder="productDescription"
                  value={productDescription}
                  onChange={e =>
                    this.setState({ productDescription: e.target.value })
                  }
                />
                <Form.Field
                  control={Checkbox}
                  label="Published"
                  placeholder="productPublished"
                  onChange={e =>
                    this.setState({ productPublished: !productPublished })
                  }
                />
                <Form.Field label="DescriptionHtml" />
                <Form.Field>
                  <Editor htmltext={this.editorText} />
                </Form.Field>

                <Mutation
                  mutation={ADD_PRODUCT_MUTATION}
                  variables={{
                    productSlug,
                    productTitle,
                    productPrice,
                    productQuantity,
                    productDescription,
                    productDescriptionHtml,
                    productPublished,
                    productTags,
                    productOptions,
                    productImage
                  }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                >
                  {mutation => (
                    <Button color="blue" fluid size="large" onClick={mutation}>
                      Add Product
                    </Button>
                  )}
                </Mutation>
              </Segment>
            </Form>
          </div>
        )}
      </CartContext.Consumer>
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
    const order = data.addProduct;
    console.log(order);
    console.log(this.state.value.map(e => ({ tag: e })));
    window.location = "/admin/listproduct";
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

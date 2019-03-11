import React, { Component } from 'react'
import gql from "graphql-tag";
import { Mutation } from "react-apollo"; 
import { Button, Form, Segment, Input, Label, Dropdown } from 'semantic-ui-react'
import { Alert } from 'reactstrap';
import { CartContext } from "../../CartContext";
import isLogin from '../../../common'

const ADD_PRODUCT_MUTATION = gql`
  mutation AddProductMutation($productSlug: String!, $productTitle: String!, $productPrice:Int!, $productDescription:String!, $productPublished:String!,$productTags:[tagsInput]!,$productOptions:String!,$productImage:String!) {
 	addProduct(productSlug: $productSlug, productTitle: $productTitle, productPrice: $productPrice, productDescription: $productDescription,productPublished: $productPublished,productTags: $productTags,productOptions: $productOptions,productImage: $productImage ) {
		id
    }
  }
`

/*const ADD_ORDER_MUTATION = gql`
  mutation AddCategoryMutation($categorySlug: String!, $categorySlug: String!, $tags:[tagsInput]!) {
  addCategory(categorySlug: $categorySlug, categorySlug: $categorySlug, tags: $tags) {
    id
    }
  }
`*/

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
class Checkout extends Component {
    state = {
      productSlug:null,
      productTitle:null,
      productPrice:0,
      productDescription:'',
      productPublished:'',
      productTags:[],
      productOptions:'',
      productImage:'',
      showError: false,
      isLogged: false,
      value:[],
      stateOptions:[]
    }
  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => this.setState({ currentValues: value })

    render() {
    const login = isLogin()
    if(login !== null){
      if(!this.state.isLogged)
      this.setState({  
        orderEmail: login.email ,
        orderFirstname: login.fname ,
        orderLastname: login.lname,
        isLogged: true 
      })
    }
    console.log(login)
    if(login == null){this.props.history.push(`/`)}
    const {  value,productSlug, productTitle, productPrice, productDescription,productPublished,productTags,productOptions,productImage,errorMessage} = this.state
    const { stateOptions } = this.state
    return (
        <CartContext.Consumer>
          {cart => (
          <div>
          <Alert color="danger" isOpen={this.state.showError} toggle={this.onDismiss} >
          {errorMessage}
        </Alert>
        
        <h3 class="ui header">Add Product</h3>
                <Form size='large' >
                  <Segment >
                    <Form.Field
                      control={Input}
                      label='Product Slug'
                      placeholder='productSlug'
                      value={productSlug}
                      onChange={e => this.setState({ productSlug: e.target.value })}
                    />
                    <Form.Field
                      control={Input}
                      label='Product Title'
                      placeholder='productTitle'
                      value={productTitle}
                      onChange={e => this.setState({ productTitle: e.target.value })}
                    />
                    <Form.Field
                      control={Input}
                      type='number'
                      label='Price'
                      labelPosition='right'
                      placeholder='productPrice'
                      value={productPrice}
                      onChange={e => this.setState({ productPrice: parseInt(e.target.value) })}
                    ><input/><Label basic>$</Label></Form.Field>
                    <Form.Field
                      control={Input}
                      label='Description'
                      placeholder='productDescription'
                      value={productDescription}
                      onChange={e => this.setState({ productDescription: e.target.value })}
                    />
                    <Form.Field
                      control={Input}
                      label='Published'
                      placeholder='productPublished'
                      value={productPublished}
                      onChange={e => this.setState({ productPublished: e.target.value })}
                    />
                    <Form.Field
                      control={Dropdown}
                      label='Tags'
                      placeholder='productTags'
                      value={value}
                      multiple 
                      allowAdditions
                      search 
                      selection 
                      noResultsMessage={null}
                      options={stateOptions}
                      onAddItem={(e, { value }) => this.setState({stateOptions: [{ key: value, value: value, text: value}, ...this.state.stateOptions],})}
                      onChange={(e, { value } )=> this.setState({ value,productTags:value.map( (e) => ({tag:e}) )} )}
                    />
                    <Form.Field
                      control={Input}
                      label='Options'
                      placeholder='productOptions'
                      value={productOptions}
                      onChange={e => this.setState({ productOptions: e.target.value })}
                    />
                    <Form.Field
                      control={Input}
                      label='Image'
                      placeholder='productImage'
                      value={productImage}
                      onChange={e => this.setState({ productImage: e.target.value })}
                    />

                    <Mutation
                      mutation={ADD_PRODUCT_MUTATION}
                      variables={{ productSlug, productTitle, productPrice, productDescription,productPublished,productTags,productOptions,productImage}}
                      onCompleted={data => this._confirm(data)}
                      onError={error => this._error(error) }
                    >
                      {mutation => (
                        <Button color='blue' fluid size='large' onClick={mutation}>
                          Add Product
                        </Button>
                      )}
                    </Mutation>
                  </Segment>
                </Form>
            </div>
              )}
        </CartContext.Consumer>
    )}
    
  toggleError = () => {
    this.setState((prevState, props) => {
      return { showError: true }
    })
  };
  onDismiss = () => {
    this.setState((prevState, props) => {
      return { showError: false }
    })
  };
  _confirm = async data => {
    const order  = data.addProduct
    console.log(order)
    console.log(this.state.value.map( (e) => ({tag:e}) ))
    window.location = '/admin/listproduct'
  }
  _error = async error => {
    //alert(error);
    console.log(this.state.productTags)
    this.setState({errorMessage: error.message})
    this.toggleError()
  }
  _saveUserData = token => {
  //localStorage.setItem(AUTH_TOKEN, token)
  }
}


export default Checkout;
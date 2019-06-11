import React from 'react'
import { post } from 'axios';
const AUTH_TOKEN = "auth-token";

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      complete:undefined
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data.error);
        if(response.data.name){
            this.setState({complete:true})
            this.props.refetch()
        }
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'http://localhost:4000/upload';
    const formData = new FormData();
    formData.append('image',file)
    formData.append('product',this.props.product.id)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' + localStorage.getItem(AUTH_TOKEN)
        }
    }
    return  post(url, formData,config)
  }
 
  render() { 
      console.log(this.props.product)
    if(this.state.complete)return <>Complete</>
    return (
      <form onSubmit={this.onFormSubmit} enctype="multipart/form-data">
        <h1>File Upload</h1>
        <input type="file" name="image" onChange={this.onChange} />
        <button type="submit" >Upload</button>
      </form>
   )
  }
}



export default SimpleReactFileUpload
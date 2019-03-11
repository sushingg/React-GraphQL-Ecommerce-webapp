import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from './Product';
import Loader from '../Loader';
import { Row , Alert } from 'reactstrap';

class Products extends React.Component {
  state = {
  }
  componentDidMount () {
	
  }
  render() {
	const { slug } = this.props.match.params
	console.log({slug})
	return(
		<div className="container-fluid h-100 py-5 bg-light ">
			<div className="container">
				<Row>
				<Query
					query={gql`
						query GetProduct($slug:String!){
						  product(productSlug:$slug){
							productSlug
							productTitle
							productPrice
							productDescription
							productTags{tag}
							productImage
						  }
						}
					  `
					}
					variables={{slug}}
				>
					{({ loading, error, data }) => {
					  if (loading) return <Loader/>;
					  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}</Alert>;
						return  (
							<Product key={data.product.id} product={data.product} />
						);

					}}
				</Query>
				</Row>
			</div>
		</div>
	)
}
}
export default Products;

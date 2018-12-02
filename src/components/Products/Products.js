import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from './Product';
import Loader from '../Loader';
import { Row , Alert } from 'reactstrap';
import { Card } from 'semantic-ui-react'

const Products = () => (
	<div className="container-fluid h-100 py-5 bg-light ">
		<div className="container">
			<Card.Group itemsPerRow={4} stackable>
			<Query
				query={gql`
				  {
					products {
					  productSlug
					  productTitle
					  productPrice
					  productDescription
					  productTags
					  productAddedDate
					  productImage
					}
				  }
				`}
			>
				{({ loading, error, data }) => {
				  if (loading) return <Loader/>;
				  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}</Alert>;
					return data.products.map((currentProduct) => (
						<Product key={currentProduct.id} product={currentProduct} />
					));

				}}
			</Query>
		  	</Card.Group>
		</div>
	</div>
	);
export default Products;

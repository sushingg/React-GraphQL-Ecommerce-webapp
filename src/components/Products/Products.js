import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Product from './Product';
import Loader from '../Loader';
import { Alert } from 'reactstrap';
import { Card, Container, Segment } from 'semantic-ui-react'
import {  Link } from "react-router-dom";
const Products = () => (
	<Container >
			<Segment basic>
			<Card.Group>
			<Query 
				query={gql`
				  {
					products {
					  productSlug
					  productTitle
					  productPrice
					  productDescription

					  productAddedDate
					  productImage
					}
				  }
				`}
			>
				{({ loading, error, data }) => {
				  if (loading) return <Loader key=""/>;
				  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}. <Link to="reload"> Reload</Link></Alert>;
					return data.products.map((currentProduct,i) => (
						<Product key={i} product={currentProduct} />
					));

				}}
			</Query>
		  	</Card.Group>
			</Segment>
	</Container>
	);
export default Products;

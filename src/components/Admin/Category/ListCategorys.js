import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListProduct from './ListProduct';
import Loader from '../../Loader';
import { Alert } from 'reactstrap';
import { Table } from 'semantic-ui-react'
import {  Link } from "react-router-dom";
const ListProducts = () => (

			<Query 
				query={gql`
						{categories{
							categorySlug
							categoryTitle
							categoryTags{
								tag
							}
						}}
				`}
			>

				{({ loading, error, data }) => {
				  if (loading) return <Loader key=""/>;
				  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}. <Link to="reload"> Reload</Link></Alert>;
					console.log(data.products);
					return data.products.map((currentProduct,i) => (
						<ListProduct key={i} product={currentProduct} />
					));

				}}

			</Query>

	);
export default ListProducts;

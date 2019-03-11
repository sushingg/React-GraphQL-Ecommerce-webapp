import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListProduct from './ListProduct';
import Loader from '../../Loader';
import { Alert } from 'reactstrap';
import { Table } from 'semantic-ui-react'
import {  Link } from "react-router-dom";
const ListProducts = () => (
  <Table stackable padded> 
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>Product list</Table.HeaderCell>
      </Table.Row>
	  <Table.Row>
        <Table.HeaderCell colSpan='1'>Products</Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>Price</Table.HeaderCell>
        <Table.HeaderCell colSpan='1' textAlign='right'>Published</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
			<Query 
				query={gql`
				  	{products {
				  	  productSlug
					  productTitle
					  productPrice
					  productPublished
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
    </Table.Body>
  </Table>
	);
export default ListProducts;

import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Order from './Order';
import Loader from '../../Loader';
import { Alert } from 'reactstrap';
import { Card,Table } from 'semantic-ui-react'
import {  Link } from "react-router-dom";
const Products = () => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='4'>Git Repository</Table.HeaderCell>
      </Table.Row>
	  <Table.Row>
        <Table.HeaderCell colSpan='1'>#</Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>Order detail</Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>Order total</Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
			<Query 
				query={gql`
				  	{orders{
					  orderDate
						orderEmail
						orderFirstname
					  orderTotal
					  orderStatus
					}}
				`}
			>
				{({ loading, error, data }) => {
				  if (loading) return <Loader key=""/>;
				  if (error) return <Alert className="text-center col" color="danger">Error :${error.message}. <Link to="reload"> Reload</Link></Alert>;
					return data.orders.map((currentOrder,i) => (
						<Order key={i} order={currentOrder} />
					));

				}}
			</Query>
    </Table.Body>
  </Table>
	);
export default Products;

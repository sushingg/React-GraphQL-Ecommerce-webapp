import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListProduct from "./ListProduct";
import { Table, Message } from "semantic-ui-react";
const ListProducts = () => (
  <Table stackable padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="3">Product list</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell colSpan="1">Products</Table.HeaderCell>
        <Table.HeaderCell colSpan="1">Price</Table.HeaderCell>
        <Table.HeaderCell colSpan="1" textAlign="right">
          Published
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Query
        query={gql`{products {
						product {
							slug
							title
							price
							description
							descriptionHtml
							category
							subCategory
							image {
								altText
								name
							}
						}
					}}
				
				
				`}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Table.Row>
                <Table.Cell colSpan="6" textAlign="center">
                  <Message compact>loading</Message>
                </Table.Cell>
              </Table.Row>
            );
          if (error)
            return (
              <Table.Row>
                <Table.Cell colSpan="6" textAlign="center">
                  <Message warning compact>
                    {error.message}
                  </Message>
                </Table.Cell>
              </Table.Row>
            );
          return data.products.product.map((currentProduct, i) => (
            <ListProduct key={i} product={currentProduct} />
          ));
        }}
      </Query>
    </Table.Body>
  </Table>
);
export default ListProducts;

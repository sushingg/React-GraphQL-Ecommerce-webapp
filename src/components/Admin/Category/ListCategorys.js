import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListCategory from "./ListCategory";
import Loader from "../../Loader";
import { List, Header, Message, Segment, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
const ListProducts = () => (
  <>
    <Header as="h3">
      Category List
      <Label basic as={Link} to={"/admin/category/add/"}>
        Add Category
      </Label>
    </Header>

    <Query
      query={gql`
        {
          categories {
			      id
            slug
            title
            subCategory {
              id
              slug
              title
            }
          }
        }
      `}
    >
      {({ loading, error, data, refetch}) => {
        if (loading) return <Loader key="" />;
        if (error)
          return (
            <Segment basic textAlign="center">
              <Message warning compact>
                {error.message}
              </Message>
            </Segment>
          );
        console.log(data.products);
        return (
          <List celled ordered size="medium">
            {data.categories.map((currentCategory, i) => (
              <ListCategory key={i} category={currentCategory} refetch={refetch}/>
            ))}
          </List>
        );
      }}
    </Query>
  </>
);
export default ListProducts;

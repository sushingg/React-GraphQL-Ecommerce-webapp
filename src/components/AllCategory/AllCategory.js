import React, { useState } from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { Link } from "react-router-dom"
import Product from "../Products/Product"
import Loader from "../Loader"
import {
  Card,
  Container,
  Segment,
  Message,
  Grid,
  Header,
  Pagination,
  Breadcrumb,
  Icon,
  Button
} from "semantic-ui-react";
import Category from "../Category/Categories";
const HomepageHeading = props => (
  <Segment padded='very' basic>
    <Grid columns={2} centered>
      <Grid.Column largeScreen={3} mobile={14} >
        <Breadcrumb>
          <Breadcrumb.Section link as={Link} to={"/c/"+props.params.category}>{props.params.category}</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link as={Link} to={"/c/"+props.params.category+"/"+props.params.subCategory}>{props.params.subCategory||"All"}</Breadcrumb.Section>
        </Breadcrumb>
        <Category />
      </Grid.Column>
      <Grid.Column largeScreen={13} mobile={16}>{props.children}</Grid.Column>
    </Grid>
  </Segment>
);
export default function AllCategory({ match }) {
  const [activePage, setActivePage] = useState(1);
  let params = { category: "", subCategory: "" };
  params.category = match.params.category || "";
  params.subCategory = match.params.subCategory || "";
  params.page = activePage
  return (
    <Container fluid>
      <HomepageHeading params={params}>
        <Segment basic>
          <Query
            query={gql`
              query GetProduct($category: String!, $subCategory: String!,$page: Int!) {
                products(category: $category, subCategory: $subCategory,limit:12,page:$page) {
                  product {
                    slug
                    title
                    price
                    description
                    descriptionHtml
                    category
                    subCategory
                    quantity
                    image {
                      altText
                      name
                    }
                  }
                  total
                  limit
                  page
                  pages
                }
              }
            `}
            variables={params}
          >
            {({ loading, error, data }) => {
              if (loading) return <Loader key="" />;
              if (error)
                return (
                  <Message>
                    <Message.Header>Error</Message.Header>
                    <p>{error.message}</p>
                  </Message>
                );

              return (
              
                <Container fluid>
                  {console.log(data.products)}
                      <Card.Group itemsPerRow={4} stackable >
                        {data.products.product.map((currentProduct, i) => (
                          <Product key={i} product={currentProduct} />
                        ))}
                      </Card.Group>
                      {data.products.product === 0 &&(
                        <Segment placeholder>
                           <Header icon>
                             <Icon name='search' />
                             ไม่พบสินค้าที่ค้นหา
                           </Header>
                           <Segment.Inline>
                             <Button primary as={Link} to='/c'>All Category</Button>
                           </Segment.Inline>
                        </Segment>

                      )}
                    <Segment basic textAlign='center'>
                      <Pagination 
                        activePage={activePage} 
                        totalPages={data.products.pages} 
                        onPageChange={(e, { activePage }) => setActivePage(activePage)}
                      />
                      <Header as="h4" textAlign="center">
                        {"Total:" +
                          data.products.total +
                          " | Page: " +
                          data.products.page +
                          " of " +
                          data.products.pages +
                          " | Limit " +
                          data.products.limit +
                          " items/pages"}
                      </Header>
                    </Segment>
                </Container>
              );
            }}
          </Query>
        </Segment>
      </HomepageHeading>
    </Container>
  );
}

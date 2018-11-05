import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col } from 'reactstrap';
const Product = (props) => {
  return (
    <Col xs="3" className="d-flex align-items-stretch py-2 ">
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.product.productTitle}</CardTitle>
          <CardSubtitle>{props.product.productPrice}</CardSubtitle>
          <CardText>{props.product.productDescription}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Product;

import React from 'react';
import {  Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, NavLink } from 'reactstrap';
const Product = (props) => {
  return (
    <div className="d-flex justify-content-around col-lg-3 col-md-6 mb-4 ">
      <Card className="mb-4 shadow"	>
		<Link to={"p/"+props.product.productSlug}>
			<CardImg top width="100%" src={"/image/"+props.product.productSlug+"/"+props.product.productImage}alt="Card image cap" />
		</Link>
        <CardBody className="text-center py-4">
          <CardTitle className="text-secondary">
			<Link  className="text-secondary" to={"p/"+props.product.productSlug}>
				{props.product.productTitle}
			</Link>
		  </CardTitle>
          <CardSubtitle className="text-dark">{props.product.productDescription}</CardSubtitle>
          <CardText className="text-primary py-2"><strong>{props.product.productPrice}฿</strong></CardText>
        </CardBody>
		<button className="product_cart_button">Add to Cart</button>
      </Card>
    </div>
  );
};

export default Product;

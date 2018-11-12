import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
const Product = (props) => {

	var { quantity } = 1
  return (
		<div className="container">
			<div className="row">
				<div className="col-lg-5 order-lg-2 order-1">
					<div className="image_selected"><img src={"/image/"+props.product.productSlug+"/"+props.product.productImage} alt=""/></div>
				</div>
				<div className="col-lg-5 order-3 ml-auto">
					<div className="product_description">
						<div className="product_category">category</div>
						<div className="product_name">{props.product.productTitle}</div>
						<div className="rating_r rating_r_4 product_rating"></div>
						<div className="product_text"><p>{props.product.productDescription}</p></div>
						<div className="order_info d-flex flex-row">
							<form action="#">
								<div className="clearfix" >
									<div >
										<span>จำนวน: </span>
										<input id="quantity_input" className="form-control" type="number" pattern="[0-9]*" value={quantity}
										onChange={e => quantity = e.target.value}/>

									</div>
								</div>
								<div className="product_price">฿{props.product.productPrice}</div>
								<div className="button_container">
									<button type="button" className="button btn-primary cart_button">Add to Cart</button>
									<div className="product_fav"><i className="fa fa-heart"></i></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
};

export default Product;

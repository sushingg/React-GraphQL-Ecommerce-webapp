import React from 'react';
const Product = (props) => (
    <div className="column is-one-quarter">
        <div className="card small">
            <div className="card-image">
                <figure className="image">
                    <img src="https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=" alt="product"/>
                </figure>
            </div>
            <div className="card-content" height="150px">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 no-padding">{props.product.productTitle}</p>
                        <p><span className="title is-6"><a href="http://twitter.com/#">{props.product.productSlug}</a></span></p>
                        <p className="subtitle is-6">{props.product.productPrice}</p>
                    </div>
                </div>
                <div className="content">
                    {props.product.productDescription}
                    <div className="background-icon"><span class="icon-twitter"></span></div>
                </div>
            </div>
        </div>
    </div>
);
export default Product;

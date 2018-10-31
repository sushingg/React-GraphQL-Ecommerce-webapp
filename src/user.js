import React from 'react';
import { div } from 'react-bootstrap';
const User = (props) => (
    <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
        <div className="card-body">
			<h5 className="card-title">{props.user.firstName}</h5>
			<h6 className="card-subtitle mb-2 text-muted">by {props.user.created}</h6>
			<p className="card-text">{props.user.lastName}</p>
			<p className="card-text">{props.user.email}</p>
        </div>
    </div>
);
export default User;


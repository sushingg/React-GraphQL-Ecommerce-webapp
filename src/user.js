import React from 'react';
import { div } from 'react-bootstrap';
const User = (props) => (
    <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
        <div className="card-body">
			<h5 className="card-title">{props.user.name}</h5>
			<h6 className="card-subtitle mb-2 text-muted">by {props.user.id}</h6>
			<p className="card-text">{props.user.email}</p>
			<p className="card-text">{props.user.tel}</p>
        </div>
    </div>
);
export default User;


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
	<BrowserRouter>
    <div className="App container">
        <Route path="/" component={App} />
	</div>
	</BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
    //<Route exact path="/" component=About/>
    //<Route exact path="/" component=Contact/>

    //<Route path="/about" component=About/>
    //<Route path="/contact" component=Contact/>
serviceWorker.unregister();

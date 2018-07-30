import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from './components/App';
import Template from './components/Template'
import fetchMock from './fetchMock';
import {data} from './data.js';

//init data in local storage
if (!window.localStorage.getItem('ardasTestTaskYVK')) {
  fetchMock(data);
}

ReactDOM.render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path={`/template/:id`} component={Template} />
    </Switch>
  </BrowserRouter>
), document.getElementById('root'));
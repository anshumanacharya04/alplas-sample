import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import HelloWorld from './components/HelloWorld/HelloWorld';

import Categories from './components/1325/Categories/Categories';

import SubCategories from './components/1325/SubCategories/SubCategories';

import SubSubCategories from './components/1325/SubSubCategories/SubSubCategories';

import Admin from './components/1325/admin';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/helloworld" component={HelloWorld}/>
        <Route path="/1325/admin" component={Admin}/>
        <Route path="/1325/categories" component={Categories}/>
        <Route path="/1325/subcategories" component={SubCategories}/>
        <Route path="/1325/subsubcategories" component={SubSubCategories}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

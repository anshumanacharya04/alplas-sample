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

import Categories from './components/1325/Categories/Categories';

import SubCategories from './components/1325/SubCategories/SubCategories';

import SubSubCategories from './components/1325/SubSubCategories/SubSubCategories';

import Admin from './components/1325/admin';

import Products from './components/Products/Products';

import AboutUs from './components/AboutUs/AboutUs';

import ContactUs from './components/ContactUs/ContactUs';

import productentry from './components/1325/Products/Products'

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Products" component={Products}/>
        <Route path="/AboutUs" component={AboutUs}/>
        <Route path="/ContactUs" component={ContactUs}/>
        <Route path="/1325/admin" component={Admin}/>
        <Route path="/1325/categories" component={Categories}/>
        <Route path="/1325/subcategories" component={SubCategories}/>
        <Route path="/1325/subsubcategories" component={SubSubCategories}/>
        <Route path="/1325/products" component={productentry}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));

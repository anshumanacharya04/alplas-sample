import React from 'react';

import { Link } from 'react-router-dom';
import {Navbar,Nav,NavItem,FormGroup,FormControl,Button,Glyphicon,InputGroup } from 'react-bootstrap';

const Header = () => (
  
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#">
    <div>
      <p className="logoText">ap</p>
    </div>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <NavItem eventKey={1} href="/Products">
        Products & Services
      </NavItem>
      <NavItem eventKey={1} href="#">
        About Us
      </NavItem>
      <NavItem eventKey={1} href="#">
        Contact Us
      </NavItem>
      <Navbar.Form pullRight>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" placeholder="Search Products" />
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </Navbar.Form>
    </Nav>
  </Navbar.Collapse>
</Navbar>
);

export default Header;

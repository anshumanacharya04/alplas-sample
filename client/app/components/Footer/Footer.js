import React , { Component } from 'react';
import {Grid, Row, Col, ListGroup, ListGroupItem, Panel,Glyphicon,InputGroup,FormControl,FormGroup} from 'react-bootstrap';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: []
    };

  }

  componentDidMount() {
		console.log('12345');
  }

  render() {
    return (
    <footer className="footer">
      <Grid>
        <Row className="show-grid">
          <Col xs={12} lg={3} className="border-right">
            <h4>Menu</h4>
            <ListGroup>
              <ListGroupItem href="#link1">Products and Services</ListGroupItem>
              <ListGroupItem href="#link2">About Us</ListGroupItem>
              <ListGroupItem href="#link2">Contact Us</ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs={12} lg={3}>
            <h4>Product Search</h4>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" placeholder="Search Products" />
                <InputGroup.Addon>
                  <Glyphicon glyph="search" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={12} lg={3} className="border-left">
            <h4>Product Categories</h4>
          </Col>
          <Col xs={12} lg={3} className="border-left">
            <h4>Enquiries</h4>
            <Panel>
              <Panel.Heading className="enquiriesFooter"><h4>Jeremy Pearse</h4></Panel.Heading>
              <Panel.Body className="enquiriesFooter">
                <h5><Glyphicon glyph="envelope" />&nbsp;&nbsp;<a>alplas@bigpond.net.au</a></h5>
                <h5><Glyphicon glyph="phone-alt" />&nbsp;&nbsp;&nbsp;&nbsp; +61 (03) 9804 3494</h5>
                <h5><Glyphicon glyph="print" />&nbsp;&nbsp;&nbsp;&nbsp; +61 (03) 9804 3495</h5>
                <h5><Glyphicon glyph="home" /> 1185 Malvern Road <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Malvern, 3144, AUSTRALIA</h5>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </footer>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import 'whatwg-fetch';
import Particles from 'react-particles-js';
import Typing from 'react-typing-animation';

const particleOpt = {
  particles:{
    number:{
      value: 100,
      density: {
        enable: true
      }
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counters: []
    };

  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div className="mainHomeText">
        <h1 className="displayInline">Alplas Products</h1>
          <h1>Specialist Importer and Supplier</h1>
          of
          <h1></h1>Plastic Drum Taps and Valves
          fittings for Drums and IBC’s
          <Particles
            params={particleOpt}
          />
        </div>
      </div>
    );
  }
}

export default Home;

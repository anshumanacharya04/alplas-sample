import React, { Component } from 'react';
import 'whatwg-fetch';
import Particles from 'react-particles-js';
import {Jumbotron,Button,Panel} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import InfiniteCarousel from 'react-leaf-carousel';

const particleOpt = {
	particles: {
		number: {
			value: 100,
			density: {
				enable: true
			}
		},
		color: {
			value: "#ffffff"
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0,
				color: "#000000"
			},
			polygon: {
				nb_sides: 5
			},
			image: {
				src: "img/github.svg",
				width: 100,
				height: 100
			}
		},
		opacity: {
			value: 0.5,
			random: false,
			anim: {
				enable: false,
				speed: 1,
				opacity_min: 0.1,
				sync: false
			}
		},
		size: {
			value: 3,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0.1,
				sync: false
			}
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#ffffff",
			opacity: 0.4,
			width: 1
		},
		move: {
			enable: true,
			speed: 6,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200
			}
		}
	},
	interactivity: {
		detect_on: "canvas",
		events: {
			onhover: {
				enable: true,
				mode: "grab"
			},
			onclick: {
				enable: true,
				mode: "push"
			},
			resize: true
		},
		modes: {
			grab: {
				distance: 400,
				line_linked: {
					opacity: 1
				}
			},
			bubble: {
				distance: 400,
				size: 40,
				duration: 2,
				opacity: 8,
				speed: 3
			},
			repulse: {
				distance: 200,
				duration: 0.4
			},
			push: {
				particles_nb: 4
			},
			remove: {
				particles_nb: 2
			}
		}
	},
	retina_detect: true
}

const items = [0,1,2,3,4,5];

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
		var productList = items.map(function(i){
			return <div> 
								<Panel bsStyle="primary">
									<Panel.Heading>
										<Panel.Title componentClass="h3">Panel heading</Panel.Title>
									</Panel.Heading>
									<Panel.Body>i</Panel.Body>
								</Panel> 
							</div>;
		})
    return (
      <div>
        <div className="mainHomeText">
          <Jumbotron className="transparentBackground">
            <h1>Alplas Products</h1>
            <h3>
              Specialist Importer and Supplier
              <br/><br/>
              of
            </h3>
              <h3>Plastic Drum Taps and Valves</h3>
              <h3>Fittings for Drums and IBC’s</h3>
            <p>
              <Button bsStyle="primary">Learn more about Products and Services</Button>
            </p>
          </Jumbotron>
          <Particles
            params={particleOpt}
          />
        </div>
				
				<div className="section carousel featuredProducts">
					<div className="sectionHeader mainHomeText">
						<h2>Featured Products</h2>
						<div className="separator"></div>
					</div>
					<InfiniteCarousel
						breakpoints={[
							{
								breakpoint: 500,
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
								},
							},
							{
								breakpoint: 768,
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3,
								},
							},
						]}
						dots={true}
						showSides={true}
						sidesOpacity={.5}
						sideSize={.1}
						slidesToScroll={3}
						slidesToShow={3}
						scrollOnDevice={true}
					>
						{
							productList
						}
					</InfiniteCarousel>
				</div>
      </div>
    );
  }
}

export default Home;

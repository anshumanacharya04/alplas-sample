import React, { Component } from 'react';

class Products extends Component {

  componentDidMount(){
    console.log("componentDidMount");
		console.log(document.getElementById("xyz").classList.add("linearbackground"));
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default Products;

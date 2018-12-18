import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Input, Select } from 'react-spreadsheet-grid'
//import AwesomeAutocomplete from 'awesome-autocomplete'

const rows=[
    { id: 1, name: '', status: ''},
];

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newProductName: "",
      products : [],
      rows,
      columns: this.initColumns()
    };

    this.newproduct = this.newproduct.bind(this);

    this._modifyproduct = this._modifyproduct.bind(this);
  }

  componentDidMount() {
    fetch('/api/Products')
      .then(res => res.json())
      .then(json => {
        //console.log(123,json);
        var tabledata=[];
        var counter = 0;
        json.forEach(element => {
          counter++;
          //console.log(element);
          tabledata.push({id:counter,name:element.name,status:element.status})
        });
        //console.log(tabledata);
        this.setState({
          products: json,
          rows : tabledata
        });
      });
  }

  newproduct() {
    //console.log(111);
    fetch('/api/Products', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify ({name: this.state.newProductName , status: 1}) })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        let data = this.state.products;
        data.push(json);
        this.setState({
          products: data
        });
      });
  }

  changeName(e){
    this.setState({
      newProductName: e.target.value
    });
  }

  updateProductName(row,rowId,value)
  {
    var id = this.state.products[rowId-1];
    fetch(`/api/Products/${id._id}/${value}/changeName`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        //this._modifyproduct(rowId, json);
      });
  }

  updateProductStatus(row,rowId,value)
  {
    var id = this.state.products[rowId-1];
    fetch(`/api/Products/${id._id}/${value}/changeStatus`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        //this._modifyproduct(rowId, json);
      });
  }

  deleteproduct(index) {
    const id = this.state.products[index]._id;

    fetch(`/api/Products/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifyproduct(index, null);
      });
  }

  _modifyproduct(index, data) {
    let prevData = this.state.products;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      products: prevData
    });
  }

  onFieldChange(rowId, field, value) {
      //console.log('field',field);
      // Find a row that is being change
      var row;
      this.state.rows.forEach(element => {
        if(element.id == rowId) {row = element; return true }
      });
      //const row = this.state.rows.find( id  => id == rowId);
      if(field == "name")
        this.updateProductName(row,rowId,value);
      if(field == "status")
        this.updateProductStatus(row,rowId,value);
      // Change a value of a field
      row[field] = value;
      //console.log(rows);
      this.setState({
          rows: [].concat(this.state.rows),
          // Blurring focus from the current cell is necessary for a correct behavior of the Grid.
          blurCurrentFocus: true
      });
  }
  
  initColumns() {
      return [
        {
          title: () => 'Category Name', 
          value: (row, { focus }) => {
            // You can use the built-in Input.
            return (
              <Input  
                value={row.name}
                focus={focus}
                onChange={this.onFieldChange.bind(this, row.id, 'name')}
              />
            );
          }
        }, {
          title: () => 'Status',
          value: (row, { focus }) => {
          
              // You can use the built-in Select.
              return (
                <Input  
                  value={row.status}
                  focus={focus}
                  onChange={this.onFieldChange.bind(this, row.id, 'status')}
                />
              );
          }
        }
      ]
  }

  render() {
    return (
      <div>
        <h4>Add new Products</h4>
        <div>
          <label htmlFor="name">New Category Name: </label>
          <input type="text" id="name" name="name" value={this.state.newProductName} onChange={() => this.changeName(event)}></input>
        </div>
        <button disabled={!this.state.newProductName} onClick={() => this.newproduct()}>Save</button>
        <br></br>
        <h4>List of Products</h4>
        <Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                // Don't forget to blur focused cell after a value has been changed.
                blurCurrentFocus={this.state.blurCurrentFocus}
            />
      </div>
    );
  }
}

export default Products;

import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Input, Select } from 'react-spreadsheet-grid'
//import AwesomeAutocomplete from 'awesome-autocomplete'

const rows=[
    { id: 1, name: '', status: ''},
];

const somePositions = [{
  id: 0,
  name: 0
}, {
  id: 1,
  name: 1
}];

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategorieName: "",
      categories : [],
      rows,
      columns: this.initColumns()
    };

    this.newcategorie = this.newcategorie.bind(this);
    //this.changeName = this.changeName.bind(this);

    //this.incrementcategorie = this.incrementcategorie.bind(this);
    //this.decrementcategorie = this.decrementcategorie.bind(this);
    //this.deletecategorie = this.deletecategorie.bind(this);

    this._modifycategorie = this._modifycategorie.bind(this);
  }

  componentDidMount() {
    fetch('/api/Categories')
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
          categories: json,
          rows : tabledata
        });
      });
  }

  newcategorie() {
    //console.log(111);
    fetch('/api/Categories', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify ({name: this.state.newCategorieName , status: 1}) })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        let data = this.state.categories;
        data.push(json);
        this.setState({
          categories: data
        });
      });
  }

  changeName(e){
    this.setState({
      newCategorieName: e.target.value
    });
  }

  updateCategorieName(row,rowId,value)
  {
    var id = this.state.categories[rowId-1];
    fetch(`/api/Categories/${id._id}/${value}/changeName`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        //this._modifycategorie(rowId, json);
      });
  }

  updateCategorieStatus(row,rowId,value)
  {
    var id = this.state.categories[rowId-1];
    fetch(`/api/Categories/${id._id}/${value}/changeStatus`, { method: 'PUT' })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        //this._modifycategorie(rowId, json);
      });
  }

  deletecategorie(index) {
    const id = this.state.categories[index]._id;

    fetch(`/api/Categories/${id}`, { method: 'DELETE' })
      .then(_ => {
        this._modifycategorie(index, null);
      });
  }

  _modifycategorie(index, data) {
    let prevData = this.state.categories;

    if (data) {
      prevData[index] = data;
    } else {
      prevData.splice(index, 1);
    }

    this.setState({
      categories: prevData
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
        this.updateCategorieName(row,rowId,value);
      if(field == "status")
        this.updateCategorieStatus(row,rowId,value);
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
        <h4>Add new Categories</h4>
        <div>
          <label htmlFor="name">New Category Name: </label>
          <input type="text" id="name" name="name" value={this.state.newCategorieName} onChange={() => this.changeName(event)}></input>
        </div>
        <button disabled={!this.state.newCategorieName} onClick={() => this.newcategorie()}>Save</button>
        <br></br>
        <h4>List of Categories</h4>
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

export default Categories;

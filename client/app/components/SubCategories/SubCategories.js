import React, { Component } from 'react';
import 'whatwg-fetch';
import { Grid, Input } from 'react-spreadsheet-grid'
import Select from 'react-select';

const divStyle = {
  width: '200px',
  display : "inline-block"
}


const rows=[
    { id: 1, name: '', status: '',categoryname:''},
];

class SubCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSubCategorieName: "",
      Subcategories : [],
      categories : [],
      rows,
      columns: this.initColumns(),
      selectedOption: null
    };

    this.newsubcategorie = this.newsubcategorie.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/Categories')
      .then(res => res.json())
      .then(json => {
        var optiondata = [];
        console.log(json);
        json.forEach(element => {
          if (element.status == 1)
            optiondata.push({value:element._id,label:element.name})
        });
        console.log(optiondata);
        this.setState({
          categories: optiondata
        });
    });
    //return true;
    fetch('/api/SubCategories')
      .then(res => res.json())
      .then(json => {
        var tabledata=[];
        var counter = 0;
        json.forEach(element => {
          counter++;
          tabledata.push({id:counter,name:element.name,status:element.status,categoryname:element.categoryname})
        });
        this.setState({
          Subcategories: json,
          rows : tabledata
        });
    });
  }

  newsubcategorie() {
    //console.log(111);
    fetch('/api/SubCategories', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify ({name: this.state.newSubCategorieName , status: 1 , categoryname : this.state.selectedOption.value}) })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        let data = this.state.Subcategories;
        data.push(json);
        this.setState({
          Subcategories: data
        });
      });
  }

  changeName(e){
    this.setState({
      newSubCategorieName: e.target.value
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

  onFieldChange(rowId, field, value) {
    return true;
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
          title: () => 'Sub Category Name', 
          value: (row, { focus }) => {
            // You can use the built-in Input.
            return (
              <Input  
                value={row.name}
                focus={focus}
                items={this.onFieldChange.bind(this, row.id, 'name')}
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
        }, {
          title: () => 'Category',
          value: (row, { focus }) => {
              // You can use the built-in Select.
              return (
                <Input  
                  value={row.categoryname}
                  focus={focus}
                  onChange={this.onFieldChange.bind(this, row.id, 'categoryname')}
                />
              );
          }
        }
      ]
  }

  handleSelectChange(option) {
    //console.log(`Option selected:`, selectedOption); return true;
    this.setState({
      selectedOption: option
    });
    //this.setState({ selectedOption: selectedOption });
    
  }
  
  render() {
    
    
    return (
      <div>
        <h4>Add new Sub Categories</h4>
        <div>
          <label htmlFor="subname">New Sub Category Name: </label>
          <input type="text" id="subname" name="subname" value={this.state.newSubCategorieName} onChange={() => this.changeName(event)}></input>
          &nbsp;&nbsp;&nbsp;|||&nbsp;&nbsp;&nbsp;
          <label>Select Category: </label>
          <div style={divStyle}>
          <Select
            value={this.state.selectedOption}
            onChange={this.handleSelectChange}
            options={this.state.categories}
          />
          </div>
        </div>
        <button disabled={!this.state.newSubCategorieName} onClick={() => this.newsubcategorie()}>Save</button>
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

export default SubCategories;

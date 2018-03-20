import React, { Component } from 'react';
import { Employee } from './employee';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    console.log(this.props);
    axios.get('http://localhost:3000/employees').then(
      response => this.setState({ employees: response.data })
    );
  }

  render() {
    if (this.state.employees) {
      const employees = this.state.employees;
      return (
        <div style={{display:'flex', justifyContent:'center'}}>
          <div style={{
            border:'1px solid black',
            borderRadius:'10px',
            width:'75%'
          }}>
            {
              employees.map(employee => (
                <Employee key={employee.id} employee={employee} opacity={0.7}/>
              ))
            }
          </div>
        </div>
      );
    } else {
      return <div>loading organization data...</div>;
    }
  }
}

export default App;

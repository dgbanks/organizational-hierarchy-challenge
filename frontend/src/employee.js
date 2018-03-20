import React from 'react';
import {Employee as Subordinate} from './employee';
import './employee.css';

export class Employee extends React.Component {
  constructor() {
    super();
    this.state = { showSubordinates: true };
  }

  renderToggleControl(employee) {
    if (employee.direct_reports) {
      if (this.state.showSubordinates) {
        return (
          <div onClick={() => this.setState({showSubordinates:false})}>
            Hide Direct Reports
          </div>
        );
      } else {
        return (
          <div onClick={() => this.setState({showSubordinates:true})}>
            Show Direct Reports
          </div>
        );
      }
    }
  }

  renderSubordinates(employee) {
    if (employee.direct_reports && this.state.showSubordinates) {
      return (
        employee.direct_reports.map(subordinate => (
          <Subordinate
            key={subordinate.id}
            employee={subordinate}
            opacity={this.props.opacity - 0.1}
          />
        ))
      );
    }
  }

  render() {
    const employee = this.props.employee;
    const opacity = this.props.opacity;
    
    return (
      <div style={{borderLeft:'1px solid black', borderRadius:'10px'}}>
        <div
          className='employee'
          style={{backgroundColor:`rgba(255,0,0,${opacity}`}}
        >
          <h1>{employee.name}, {employee.title}</h1>
          {this.renderToggleControl(employee)}
        </div>
        <div style={{width:'95%', marginLeft:'5%'}}>
          {this.renderSubordinates(employee)}
        </div>
      </div>
    );
  }
}

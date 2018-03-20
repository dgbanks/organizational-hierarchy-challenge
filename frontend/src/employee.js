import React from 'react';
import {Employee as Subordinate} from './employee';

export class Employee extends React.Component {
  constructor() {
    super();
    // this.state = { showSubordinates: true };
  }

  render() {
    const employee = this.props.employee;
    const hasDirectReports = Boolean(employee.direct_reports);
    const opacity = this.props.opacity;
    return (
      <div style={{border:'1px solid black', borderRadius:'10px'}}>
        <div style={{
          border: '1px solid black',
          padding: '0px 20px',
          backgroundColor: `rgba(255,0,0,${opacity})`,
          borderRadius: '10px'
        }}>
          <h1>{employee.name}, {employee.title}</h1>
        </div>
        <div style={{width:'95%', marginLeft:'5%'}}>
          {
            hasDirectReports ?
            employee.direct_reports.map(subordinate => (
              <Subordinate
                key={subordinate.id}
                employee={subordinate}
                opacity={opacity - 0.1}
              />
            )) : null
          }
        </div>
      </div>
    );
  }
}

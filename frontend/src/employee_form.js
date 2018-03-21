import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      newEmployee: {
        first_name: '', last_name: '', title: '', manager_id: null
      }
    };

    this.updateField = this.updateField.bind(this);
    this.updateManager = this.updateManager.bind(this);
  }

  componentWillMount() {
    if (this.props.employee) {
      console.log('editing');
    }
    console.log('componentWillMount form');
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    this.setState({
      newEmployee: Object.assign(
        {}, this.state.newEmployee, { manager_id: newProps.manager.id }
      ),
      managerName: newProps.manager.name
    });
  }

  updateField(e) {
    if (e.target.placeholder === 'First Name') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { first_name: e.target.value }
        )
      });
    }
    if (e.target.placeholder === 'Last Name') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { last_name: e.target.value }
        )
      });
    }
    if (e.target.placeholder === 'Title') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { title: e.target.value }
        )
      });
    }

    let { first_name, last_name, title } = this.state.newEmployee;
    if (first_name && last_name && title) {
      this.setState({ formComplete: true });
    } else {
      this.setState({ formComplete: false });
    }
  }

  updateManager() {
    if (this.state.newEmployee.manager_id) {
      return (
        <span>
          <p>Manager: {this.state.managerName}</p>
          <button style={{fontSize: '15px', padding: '5px'}}
            onClick={() => this.setState({ newEmployee: Object.assign(
              {}, this.state.newEmployee, { manager_id: null }
            )
          })}>
            Remove manager
          </button>
        </span>
      );
    } else {
      return (
        <p>Click an existing employee to assign a manager (optional)</p>
      );
    }
  }

  render() {
    console.log('FORM');
    console.log(this.state);
    return (
      <div className='header form'>

        <div>
          <input placeholder='First Name'
                 onChange={(e) => this.updateField(e)}/>
          <input placeholder='Last Name'
                 onChange={(e) => this.updateField(e)}/>
          <input placeholder='Title'
                 onChange={(e) => this.updateField(e)}/>
            {this.updateManager()}
        </div>

        <div>
          <button
            disabled={!this.state.formComplete}
            onClick={() => this.props.handleSubmit(this.state.newEmployee)}
            style={ !this.state.formComplete ? {display: 'none'} : null }
          >
            Save
          </button>
          <button onClick={this.props.closeForm}>
            Cancel
          </button>
        </div>

      </div>
    );
  }
}

export default Form;

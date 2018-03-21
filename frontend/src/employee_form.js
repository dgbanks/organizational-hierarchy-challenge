import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
        id: null, first_name: '', last_name: '', title: '', manager_id: null
    };

    this.updateField = this.updateField.bind(this);
    this.updateManager = this.updateManager.bind(this);
  }

  componentWillMount() {
    if (this.props.employee) {
      const employee = this.props.employee;
      this.setState({
        id: employee.id,
        first_name: employee.name.split(" ")[0],
        last_name: employee.name.split(" ")[1],
        title: employee.title,
        manager_id: employee.manager_id,
        managerName: employee.managerName
      });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      manager_id: newProps.manager.id,
      managerName: newProps.manager.name
    });

    if (this.props.employee) {
      if (newProps.manager.id !== this.props.employee.manager_id) {
        this.setState({ formComplete: true });
      } else {
        this.setState({ formComplete: false });
      }
    }
  }

  updateField(e) {
    if (e.target.placeholder === 'First Name') {
      this.setState({ first_name: e.target.value });
    }
    if (e.target.placeholder === 'Last Name') {
      this.setState({ last_name: e.target.value });
    }
    if (e.target.placeholder === 'Title') {
      this.setState({ title: e.target.value });
    }

    let { first_name, last_name, title } = this.state;
    if (!this.props.employee && (first_name && last_name && title)) {
      this.setState({ formComplete: true });
    } else if (this.props.employee) {
      let { firstName, lastName, title1 } = this.props.employee;
      if (this.props.employee &&
      (first_name !== firstName || last_name !== lastName || title !== title1)
      ) {
        this.setState({ formComplete: true });
      }
    } else {
      this.setState({ formComplete: false });
    }
  }

  updateManager() {
    if (this.state.manager_id) {
      return (
        <span>
          <p>Manager: {this.state.managerName}</p>
          <button style={{fontSize: '15px', padding: '5px'}}
            onClick={() => this.setState({  manager_id: null })}>
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
    const complete = this.state.formComplete;
    return (
      <div className='header form'>

        <div>
          <input
            placeholder='First Name'
            value={this.state.first_name}
            onChange={(e) => this.updateField(e)}/>
          <input
            placeholder='Last Name'
            value={this.state.last_name}
            onChange={(e) => this.updateField(e)}/>
          <input
            placeholder='Title'
            value={this.state.title}
            onChange={(e) => this.updateField(e)}/>

          {this.updateManager()}
          
          <p>{this.props.notice}</p>
        </div>

        <div>
          <button onClick={() => this.props.handleSubmit(this.state)}
          style={ !complete ? {display: 'none'} : null }>
            Save
          </button>
          <button onClick={() => this.props.handleSubmit(this.state.id)}
          style={ !this.props.employee ? {display:'none'} : null }>
            Delete
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

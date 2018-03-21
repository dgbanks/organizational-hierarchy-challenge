import React from 'react';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null, 
      first_name: '',
      last_name: '',
      title: '',
      manager_id: null
    };

    this.updateField = this.updateField.bind(this);
    this.updateManager = this.updateManager.bind(this);
    this.addSubordinate = this.addSubordinate.bind(this);
    this.checkFormCompleteness = this.checkFormCompleteness.bind(this);
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
    if (newProps.manager) {
      this.setState({
        manager_id: newProps.manager.id,
        managerName: newProps.manager.name
      });

      if (this.state.id) {
        if (newProps.manager.id !== this.props.employee.manager_id) {
          this.setState({ formComplete: true });
        } else {
          this.setState({ formComplete: false });
        }
      }
    }
  }

  updateField(e) {
    if (e.target.placeholder === 'First Name') {
      this.setState({ first_name: e.target.value }, () =>
        this.checkFormCompleteness()
      );
    }
    if (e.target.placeholder === 'Last Name') {
      this.setState({ last_name: e.target.value }, () =>
        this.checkFormCompleteness()
      );
    }
    if (e.target.placeholder === 'Title') {
      this.setState({ title: e.target.value }, () =>
        this.checkFormCompleteness()
      );
    }
  }

  updateManager() {
    this.setState({manager_id: null}, () => this.checkFormCompleteness());
  }

  checkFormCompleteness() {
    let { first_name, last_name, title } = this.state;

    if (!this.state.id && (first_name && last_name && title)) {
      this.setState({ formComplete: true });
    } else if (this.state.id) {

      if (this.state.manager_id !== this.props.employee.manager_id) {
        this.setState({ formComplete: true });
      } else {
        this.setState({ formComplete: false });
      }

      let firstName = this.props.employee.name.split(" ")[0];
      let lastName = this.props.employee.name.split(" ")[1];
      let ogTitle = this.props.employee.title;

      if (first_name !== firstName || last_name !== lastName || title !== ogTitle) {
        this.setState({ formComplete: true });
      } else {
        this.setState({ formComplete: false});
      }

    } else {
      this.setState({ formComplete: false });
    }
  }

  addSubordinate() {
    this.setState({
      id: null,
      first_name: '',
      last_name: '',
      title: '',
      manager_id: this.props.employee.id,
      managerName: this.props.employee.name
    });
  }

  render() {
    const employeeExists = Boolean(this.state.id);
    const formComplete = this.state.formComplete;
    const allowSubordinate = !employeeExists || (employeeExists && formComplete);

    return (
      <div className='header form'>

        <div>
          <input
            placeholder='First Name'
            value={this.state.first_name}
            onChange={e => this.updateField(e)}/>
          <input
            placeholder='Last Name'
            value={this.state.last_name}
            onChange={e => this.updateField(e)}/>
          <input
            placeholder='Title'
            value={this.state.title}
            onChange={e => this.updateField(e)}/>

          {
            this.state.manager_id ?
            <span>
              <p>Manager: {this.state.managerName}</p>
              <button style={{fontSize: '15px', padding: '5px'}}
                onClick={this.updateManager}>
                Remove manager
              </button>
            </span> :
            <p>Click an existing employee to assign a manager (optional)</p>
          }

          <p style={{color: 'red'}}>{this.props.notice}</p>
        </div>

        <div>
          <button onClick={() => this.props.handleSubmit(this.state)}
          style={ !formComplete ? {display: 'none'} : null }>
            Save
          </button>
          <button onClick={this.addSubordinate}
          style={ allowSubordinate ? {display: 'none'} : null}>
            Add Subordinate
          </button>
          <button onClick={() => this.props.handleSubmit(this.state.id)}
          style={ !employeeExists ? {display:'none'} : null }>
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

import React from 'react';
import helpers from './helpers';

//onClick={() => this.changeCheck(data.id)}
class TimersDashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      timers: [
        {
          title: "Web technologies",
          project: "5 October", 
          id: helpers.guid(),
          priority: 2,
        }, {
          title: "System Programming",
          project: "4 September",
          id: helpers.guid(),
          priority: 1,
        }
      ],
    };
  }

  handleTrashClick = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId),
    });
  }

  handleSearched = (text) => {
    let newArray = this.state.timers.filter ( item => {
      return item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
             item.project.toLowerCase().indexOf(text.toLowerCase()) >= 0
    })

    this.setState ({
      timers: newArray
    })
  }

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };


  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  };

  handleEditFormSubmit = (timer) => {
    this.updateTimer(timer)
  };


  updateTimer = (newTimer) => {
  
    const newArr = this.state.timers.map((timer) => {
      if (timer.id === newTimer.id) {
        return Object.assign({}, timer, {
          title: newTimer.title,
          project: newTimer.project,
        });
      } else {
        return timer;
      }
    });
    
    this.setState({
      timers: newArr,
    });    
  };



  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <SearchBar onSearched={this.handleSearched}/>
          <EditableTimerList 
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
             
          />
          <ToggleableTimerForm 
            onFormSubmit={this.handleCreateFormSubmit} 
          />
            
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {

  
  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick = {this.props.onTrashClick}
      />
    ));//a
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

//a
class EditableTimer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      editFormOpen: false,
    };
  }

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };


  handleEditClick = () => {
    this.openForm();
  }

  openForm = () => {
    this.setState({
      editFormOpen: true,
    })
  };

    handleFormClose = () => {
    this.closeForm();
  };

   closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
      //a
    } else {
      return (
        <Timer
          
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onEditClick={this.handleEditClick}
          onTrashClick = {this.props.onTrashClick}
        />
      );
    }
  }
}

//a

class TimerForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      title: this.props.title || '',
      project: this.props.project || '',
    }
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleProjectChange = (e) => {
    this.setState({
      project: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Todo</label>
              <input 
                type='text' 
                value={this.state.title} 
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Deadline</label>
              <input 
                type='text' 
                value={this.state.project}
                onChange={this.handleProjectChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button 
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button 
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class ToggleableTimerForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
    }
    // this.handleFormOpen = this.handleFormOpen.bind(this);
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleFormClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };


  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
         />
      );
      //a
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button 
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

//a
class Timer extends React.Component {

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  startClick = () => {
    this.props.onStartClick(this.props.id);
  };

  TrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
  const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
  return (
    <div className='ui centered card'>
      <div className='content'>
        <div className='header'>{this.props.title}</div>
        <div className='meta'>{this.props.project}</div>
        <div className='center aligned description'>
        </div>

        <div className='extra content'>
          <span className='right floated edit icon' onClick={this.props.onEditClick}>
            <i className='edit icon' />
          </span>
          <span className='right floated trash icon' onClick={this.TrashClick}>
            <i className='trash icon' />
          </span>
        </div>
      </div>      
      
    </div>
  );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: '',
    }

  }

  handleInputChange = (e) => {
    this.setState({inputText: e.target.value});
  }

  handleIconClick = () => {
    this.props.onSearched(this.state.inputText);
  }

  handleKeyPress = (event)=> {
    this.handleIconClick();
  }

  render() {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <span>
            <i
              onClick={this.handleIconClick}>
            </i>
          </span>
          <input
            className="prompt"
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            placeholder="Todo or deadline"
            onKeyPress={this.handleKeyPress}/>
          <i class="search icon"></i>
        </div>
      </div>
    );
  }

}


export default TimersDashboard;


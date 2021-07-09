import React, {Component} from 'react';
import Widget from './Widget';
import socket from './utilities/socketConnection';
import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      performanceData: {}
    };
  }

  componentDidMount() {
    socket.on('data', data => {
      this.setState(currSt => {
        let newState = {...currSt.performanceData};
        newState[data.macA] = data;
        return {
          performanceData: newState
        }
      });
    });
  }

  render() {
    const {performanceData} = this.state;
    return (
      <div className="App container">
        <div className="row">
          {Object.entries(performanceData).map(([key, value]) => <Widget key={key} data={value}/>)}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import Gauge from 'react-svg-gauge';
import './App.css';

var axios = require('axios');

var config = {
  api: 'http://localhost:8080'
}

class App extends Component {

  constructor(){
    super();
    // make request to server to get usage.
    this.getUsage();

    // init state for component
    this.state = {
      usage: 0,
    }

    this.interval;
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      this.getUsage();
    },1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    this.interval = null;
  }

  getUsage(){
    axios.get(`${config.api}/api/usage`)
      .then((response) => {
        this.setState({
          usage: parseInt(response.data.usage,10)
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Usage Monitor</h1>
        <p>Usage is at: {this.state.usage}%</p>
        <Gauge value={this.state.usage} width={400} height={320} label="This is my Gauge" />
      </div>
    );
  }
}

export default App;

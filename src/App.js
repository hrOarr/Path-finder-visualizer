import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualizer from './components/visualizer';
import { Container } from 'reactstrap';

class App extends Component {
  render(){
    return (
      <div className="App">
       <Container>
        <Visualizer />
       </Container>
      </div>
    );
  }
}

export default App;

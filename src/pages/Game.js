import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      gameInfo: this.props
     }
  }
  
  render() { 
    console.log(this.state.gameInfo)
   
    return (  
      <h1>Game { this.props.match.params.id  }</h1>
    );
  }
}
 
export default Game;
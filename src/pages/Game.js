import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import Questions from './Questions'
import Winners from './Winners'
import Players from './Players'
import ListGroup from 'react-bootstrap/ListGroup';
import { Table } from 'react-bootstrap'
import moment from 'moment';
import gameObject from './gameObject'
import Alert from 'react-bootstrap/Alert'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null,
      players: null,
      games: gameObject
    }
  }
        

  componentDidMount = () => {  
    let result = this.state.games.filter(game => game.id == this.props.match.params.id )
    this.setState({ game: result[0]})
    console.log(this.state.game)
  }
   

//  why is this returning null without the game &&
  gameStatus = () => {
    const { game } = this.state
    if (game && game.status === 'Pending') {
        return (
          <Badge variant="primary"> {game.status} </Badge>
        )
    } else if (game && game.status === 'Active') {
      const end = moment(game.end)
        if ( moment().isBefore(end) ) {
          return (
            <Badge variant="success"> {game.status} </Badge>
          )
        } else if ( moment().isAfter(end) && moment().isBefore(end.add(4, 'hours'))) {
          return (
            <Badge variant="warning"> {game.status} </Badge>
          )
        }  else {
          return (
            <Badge variant="danger"> {game.status} </Badge>
          )
        }
    } else if (game && game.status === 'Complete') {
        return (
          <Badge variant="dark"> {game.status} </Badge>
        )
      }
    } 
 
  render() {
    const { game } = this.state;   
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        </Navbar>
        <Row>
          <Col md={{ span: 8, offset: 2}}>
            <Jumbotron style={{marginTop: 10}}>
              <h1 className="d-flex justify-content-center">
                { game && game.team }
              </h1>
              <Alert className="d-flex justify-content-center" variant={'success'}>
                Start: { game && game.start}
              </Alert>
              <Alert className="d-flex justify-content-center" variant={'danger'}>
                End: { game && game.end}
              </Alert>
              <h1 className="d-flex justify-content-center">
              { this.gameStatus() }
                <Badge variant={game && game.client  === "BudLight" ? 'info' : 'danger' }>
                  { game && game.client }
                </Badge>
                <Badge variant={ 'dark' }>
                  { game && game.type }
                </Badge>
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 1}}>
            { game && <Questions qlist={ this.state.game.questions }/> }
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            { game && <Winners playerList={ this.state.game.players }/> }
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1}}>
            { game && <Players playerList={ this.state.game.players} /> }
          </Col>
        </Row>
      </div>
    );
  }
}
 
export default Game;
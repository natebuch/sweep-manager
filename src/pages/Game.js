import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import Questions from './Questions'
import QuestionEdit from './QuestionEdit'
import Winners from './Winners'
import WinnerEdit from './WinnerEdit'
import Players from './Players'
import ListGroup from 'react-bootstrap/ListGroup';
import { Table } from 'react-bootstrap'
import moment from 'moment';
import gameObject from './gameObject'
import Alert from 'react-bootstrap/Alert'
import { Button } from 'react-bootstrap'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null,
      players: null,
      games: gameObject,
      show: false
    }
  }
        

  componentDidMount = () => {  
    let result = this.state.games.filter(game => game.id == this.props.match.params.id )
    this.setState({ game: result[0]})
    // console.log(this.state.game)
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

    // showModal = () => {
    //   this.setState(prevState => { 
    //     return {
    //       show: !prevState.show
    //     }
    //   })
    // }

    showModal = () => {
      this.setState({ show: true})
    }

    hideModal = () => {
      console.log('hide modal')
      setTimeout(() => {
        this.setState({ show: false })
      }, 100)
    }
   
  render() {
    const { game } = this.state;  

    console.log(this.state.show)
    
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        </Navbar>
        <Row>
          <Col md={{ span: 8, offset: 2}}>
            <Jumbotron style={{ marginTop: 10, paddingTop: 10, paddingRight: 20 }}>
              <Row>
                <Col md={{ span: 1, offset: 11}}>
                  <Button variant="primary">
                    Edit
                  </Button>
                </Col>
              </Row>
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
            <Row >
              <Col md={10}>
                <h3>
                  Game Questions
                </h3>
              </Col>
              <Col md={2}>
                <Button variant="primary" size="sm" onClick={ this.showModal }>
                  Edit { game && <QuestionEdit show={ this.state.show } hideModalFunc={ this.hideModal } gameId={this.state.game.id} />}
                </Button>
              </Col>
            </Row>
            { game && <Questions qlist={ this.state.game.questions }/> }
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Row >
              <Col md={10}>
                <h3>
                  Game Winners
                </h3>
              </Col>
              <Col md={2}>
               {/* <Button variant="primary" size="sm" onClick={ this.showModal }>
                  Edit { game && <WinnerEdit show={ this.state.show } hideModalFunc={ this.hideModal } gameId={this.state.game.id} />}
                </Button> */}
              </Col>
            </Row>
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
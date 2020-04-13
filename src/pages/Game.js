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
import axios from 'axios'

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      game: null,
      gameDetails: null,
      questions: null,
      newQuestions: [],
      winners: null,
      players: null,
      showQuestionEdit: false,
      showGameEdit: false,
      showWinnerEdit: false,
    }
  }
        
  componentDidMount() {
    axios.get(`http://localhost:3000/games/${ this.props.match.params.id }`) .then((response) => {
      let data = response.data  
      return data
    })
    .then((data) => {
      this.setState({
        game: data.game,
        winners: data.game.cards.winners,
        players: data.game.players,
        questions: data.game.questions
      });
    });
  }
   

//  why is this returning null without the game &&
gameStatus = (game) => {
  if (game && game.status.description === 'Pending') {
      return (
        <Badge variant="primary"> {game.status.description} </Badge>
      )
  } else if (game && game.status.description === 'In Progress') {
    const end = moment(game.end)
      if ( moment().isBefore(end) ) {
        return (
          <Badge variant="success"> {game.status.description} </Badge>
        )
      } else if ( moment().isAfter(end) && moment().isBefore(end.add(4, 'hours'))) {
        return (
          <Badge variant="warning"> {game.status.description} </Badge>
        )
      }  else {
        return (
          <Badge variant="danger"> {game.status.description} </Badge>
        )
      }
  } else if (game && game.status.description === 'Closed Out') {
      return (
        <Badge variant="dark"> {game.status.description} </Badge>
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

    showQuestionModal = () => {
      this.setState({ showQuestionEdit: true})
    }

    hideQuestionModal = () => {
      setTimeout(() => {
        this.setState({ showQuestionEdit: false })
      }, 100)
    }

    showGameModal = () => {
      this.setState({ showGameEdit: true})
    }

    hideGameModal = () => {
      setTimeout(() => {
        this.setState({ showGameEdit: false })
      }, 100)
    }

    showWinnerModal = () => {
      this.setState({ showWinnerEdit: true})
    }

    hideWinnerModal = () => {
      setTimeout(() => {
        this.setState({ showWinnerEdit: false })
      }, 100)
    }

    handleSaveQuestion = () => {
      const ogQuestions = this.state.questions
      const newQuestions = this.state.newQuestions
      const allQuestions = ogQuestions.concat(newQuestions)
      this.setState({ 
        questions: allQuestions
      })
      if ( newQuestions.length > 0 ) {
        newQuestions.map(question => {
          axios.post("http://localhost:3000/questions", { question: { game_id: this.state.game.id, description: question.description, status: 1, is_active: 1 }}).then((response) => {
          })     
        })
      }
      this.hideQuestionModal()
    }

 
  render() {
    const { game, questions, newQuestions} = this.state
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
                  {/* <Button variant="primary" size="sm" onClick={ this.showGameModal }>
                    Edit { game && <GameEdit show={ this.state.showGameEdit } hideModalFunc={ this.hideGameModal } gameId={game.id} />}
                  </Button> */}
                </Col>
              </Row>
              <h1 className="d-flex justify-content-center">
                { game && game.description }
              </h1>
              <Alert className="d-flex justify-content-center" variant={'success'}>
                Start: { game && moment(game.start).format('MMMM Do YYYY, h:mm:ss a')}
              </Alert>
              <h1 className="d-flex justify-content-center">
                { this.gameStatus() }
                <Badge variant={game && game.client.name  === "NFL" ? 'info' : 'danger' }>
                  { game && game.client.name }
                </Badge>
                <Badge variant={ 'dark' }>
                  { game && game.game_type.description }
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
                <Button variant="primary" size="sm" onClick={ this.showQuestionModal }>
                  Edit 
                    { game && <QuestionEdit 
                      showModal={ this.state.showQuestionEdit }
                      hideModalFunc={ this.hideQuestionModal } 
                      handleSaveQuestionFunc={ this.handleSaveQuestion }
                      gameId={game.id} 
                      qlistEdit={ questions }
                      newQuestions = { newQuestions }
                         />}
                </Button>
              </Col>
            </Row>
            { game && <Questions qlist={ questions }/> }
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Row >
              <Col md={10}>
                <h3>
                  Game Winners
                </h3>
              </Col>
              <Col md={2}>
               <Button variant="primary" size="sm" onClick={ this.showWinnerModal }>
                  Edit { game && <WinnerEdit show={ this.state.showWinnerEdit } hideModalFunc={ this.hideWinnerModal } gameId={ game.id } winnerListEdit={ game && game.cards } />}
                </Button>
              </Col>
            </Row>
            { game && <Winners winnerList={ game.cards }/> }
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1}}>
            { game && <Players playerList={ game && game.players } /> }
          </Col>
        </Row>
      </div>
    );
  }
}
 
export default Game;



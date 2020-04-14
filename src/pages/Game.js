import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import Navbar from 'react-bootstrap/Navbar'
import Questions from './Questions'
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

const pending = 0
const complete = 1

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
      questionDescriptionInput: "",
      questionStatusInput: ""
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

  //Refactor to combine

  

  handleQuestionStatusChange = (e) => {
    this.setState({
      questionStatusInput: e.target.value
    });
  }

  handleQuestionDescriptionChange = (e) => {
    this.setState({
      questionDescriptionInput: e.target.value,
    });
  }
    
  loadQuestions = () => {
    const questions = this.state.questions
      return questions.map(question => {
          return (
        <tr key={ question.id }>
          <td>
            { question.description }
          </td>
          <td>
            { question.status }
          </td>
          <td style={{ textAlign: "center" }}>
            <Button size="sm" variant="danger" style = {{ marginLeft: 5, marginRight: 5  }} onClick={ () => { this.inactivateQuestion(question.id) } }>
              -
            </Button>
          </td>
        </tr>
      )
    })
  }

    addQuestions = () => {
    return (
    <tr>
      <td>
        <textarea type="text" placeholder="Question Description" value={ this.state.questionDescriptionInput } onChange={ this.handleQuestionDescriptionChange }/>
      </td>
      <td>
        <textarea type="text" placeholder="Status" value={ this.state.questionStatusInput } onChange={ this.handleQuestionStatusChange }/>
      </td>
      <td style={{ textAlign: "center" }}>
        <Button variant="success" onClick={ this.handleQuestionAdd }>
          + 
        </Button>
      </td>
    </tr>
    )
  }

  inactivateQuestion = (id) => {
    axios.patch(`http://localhost:3000/questions/${ id }`, { question: {is_active: 0 }}) .then((response) => {
      let data = response.data  
      console.log(data)
      return data
    }) .then((data) => {
      
      
    }

  }

  handleQuestionAdd = () => {
    const questionArr = this.state.questions
    const editQuestion = {
      description: this.state.questionDescriptionInput,
      status: this.state.questionStatusInput
    }
    
    if (editQuestion.description.length > 0 && editQuestion.description.length > 0) {
    axios.post("http://localhost:3000/questions", { question: { game_id: this.state.game.id, description: editQuestion.description, status: 1, is_active: 1 }}).then((response) => {
      let data = response.data.question
      console.log(data)
      return data
    })
    .then((data) => {
      questionArr.push(data)
      this.setState({
        questions: questionArr,
        questionDescriptionInput: "",
        questionStatusInput: ""
      });
    });
    } else {
      window.alert("Question text cannot be empty")
    }
    console.log(this.state.questions)
  }


  
  clearQuestionChanges = () => {
    this.setState({
      questionDescriptionInput: "",
      questionStatusInput: "",
      newQuestions: []
    },

      console.log(this.state.newQuestions)
    )}

  render() {
    const { game, questions, newQuestions, questionDescriptionInput, questionStatusInput} = this.state
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
          <Col md={10}>
          </Col>
          { game && <Questions
            handleSaveQuestionFunc={ this.handleSaveQuestion }
            gameId={game.id} 
            questions={ questions }
            newQuestions = { newQuestions }
            handleClearQuestionChangesFunc={ this.clearQuestionChanges }
            clearQuestionChangesFunc={ this.clearQuestionChanges }
            loadQuestionsFunc={ this.loadQuestions() }
            addQuestionsFunc={ this.addQuestions() }
          />}
        </Col>
        <Col md={{ span: 4, offset: 2 }}>
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



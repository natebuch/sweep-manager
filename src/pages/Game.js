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
      questionStatusInput: "",
      questionNewStatusInput: "",
      statusTargetId: null,
      statusValue: null,
      show: false
    }
  }
        
  componentDidMount() {
    axios.get(`http://localhost:3000/games/${ this.props.match.params.id }`).then((response) => {
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
      console.log(this.state.game)
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

  

  handleQuestionStatusChange = (id,e) => {
    const value = e.target.value
    axios.put(`http://localhost:3000/questions/${ id }.json`, { question: { status: value }}).then((response) => {
      let data = response.data.question
      // items[3] = data, => items[items.findIndex((item) => { item.id === data.id)] = data }
      const questions = this.state.questions
      questions.map((question,index) => {
        if (question.id === data.id) {
        questions[index] = data
        }
      })
      // questions.map(question => question.id)
      this.setState({
        questions: questions
      })
    })
  }

  handleNewQuestionStatusChange = (e) => {
    this.setState({
      questionNewStatusInput: e.target.value
    });
    console.log(this.state.questionNewStatusInput)
  }

  handleQuestionDescriptionChange = (e) => {
    this.setState({
      questionDescriptionInput: e.target.value,
    });
    console.log(this.state.questionDescriptionInput)
  }

  handleShow = () => {
    const show = this.state.show
      this.setState({
        show: !show
      })
      console.log(this.state.show)
    }
    
  loadQuestions = () => {
  const questions = this.state.questions
    return questions.map(question => {
      if (question.is_active) {
        return (
          <tr key={ question.id }>
            <td>
              { question.description }
            </td>
            <td style={{ textAlign: "center" }}>
              <select id="status-select-existing" defaultValue={ question.status } onChange={ (e) => this.handleQuestionStatusChange(question.id,e) } style={{ width: "100px" }}>
                {/* Could add status and map over for available options, hardcoded for now */}
                <option value="incomplete">Incomplete</option>
                <option value="complete">Complete</option>
              </select>
            </td>
            <td style={{ textAlign: "center" }}>
              <Button size="sm" variant="danger" style = {{ marginLeft: 5, marginRight: 5  }} onClick={ () => { this.inactivateQuestion(question.id) } }>
                -
              </Button>
            </td>
          </tr>
        )
      }
    })
  } 

  updateStatus = (id,e) => {
    axios.put(`http://localhost:3000/questions/${ id }.json`, { question: { status: e }}).then((response) => {
      let data = response.data.question
      // items[3] = data, => items[items.findIndex((item) => { item.id === data.id)] = data }
      const questions = this.state.questions
      questions.map((question,index) => {
        if (question.id === data.id) {
        questions[index] = data
        }
      })
      // questions.map(question => question.id)
      this.setState({
        questions: questions
      })
    })

  }
  
  inactivateQuestion = (id) => {
    axios.put(`http://localhost:3000/questions/${ id }.json`, { question: { is_active: 0 }}).then((response) => {
      let data = response.data.question
      // items[3] = data, => items[items.findIndex((item) => { item.id === data.id)] = data }
      const questions = this.state.questions
      questions.map((question,index) => {
        if (question.id === data.id) {
        questions[index] = data
        }
      })
      // questions.map(question => question.id)
      this.setState({
        questions: questions
      })
    }) 
  }

  handleQuestionAdd = () => {
    const questionArr = this.state.questions
    const editQuestion = {
      gameId: this.state.game.id,
      description: this.state.questionDescriptionInput,
      status: this.state.questionNewStatusInput
    }
    
    if ( editQuestion.description.length > 0 ) {
    axios.post("http://localhost:3000/questions", {question: {game_id: editQuestion.gameId, description: editQuestion.description, status: editQuestion.status, is_active: 1 }}).then((response) => {
      let data = response.data.question
      return data
    })
    .then((data) => {
      questionArr.push(data)
      this.setState({
        questions: questionArr,
        questionDescriptionInput: "",
        questionNewStatusInput: ""
      });
    });
    this.handleShow()
    } else {
      window.alert("Question text cannot be empty")
    }
    console.log(this.state.questionDescriptionInput, this.state.questionNewStatusInput)
  }

  clearQuestionChanges = () => {
    this.setState({
      questionDescriptionInput: "",
      questionStatusInput: "",
      newQuestions: []
    },
    this.handleShow()
  )}

  render() {
    console.log(this.state.show)
    const { game, questions, newQuestions, questionDescriptionInput, questionNewStatusInput } = this.state
    return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      </Navbar>
      <Row>
        <Col md={{ span: 10, offset: 1}}>
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
          <Col md={{ span: 5, offset: 1 }}>
            <Row>
              <Col md={{ span: 4}}>
                <h3>Questions</h3>
              </Col>
              <Col md={{ span: 1, offset: 7}}>
                <Button variant="success" className="float-right" onClick={ this.handleShow }>
                    +
                </Button>
              </Col>
            </Row>
            { game && <Questions
                show={ this.state.show }
                handleShowFunc={ this.handleShow }
                handleSaveQuestionFunc={ this.handleSaveQuestion }
                gameId={game.id} 
                questions={ questions }
                newQuestions = { newQuestions }
                handleClearQuestionChangesFunc={ this.clearQuestionChanges }
                clearQuestionChangesFunc={ this.clearQuestionChanges }
                questionDescriptionInput={ questionDescriptionInput }
                handleQuestionDescriptionChangeFunc={ this.handleQuestionDescriptionChange }
                questionNewStatusInput={ questionNewStatusInput }
                handleNewQuestionStatusChangeFunc={ this.handleNewQuestionStatusChange }
                handleQuestionAddFunc={ this.handleQuestionAdd }
              />}
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Status</th>
                    <th>Edit</th> 
                  </tr>
                </thead>
                <tbody>
                  { game && this.loadQuestions() }
                </tbody>
              </Table>
          </Col>
          <Col md={{ span: 5 }}>
            <Row>
                <Col md={{ span: 4}}>
                  <h3>Winners</h3>
                </Col>
                <Col md={{ span: 1, offset: 7}} >
                  <Button variant="success" className="float-right" onClick={ this.handleShow }>
                      +
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



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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      game: null,
      gameDetails: null,
      questions: null,
      newQuestionArr: [],
      winners: null,
      players: null,
      statusTargetId: null,
      statusValue: null,
      show: false,
      showEdit: false,
      newSet: [],
      editQuestionId: null,
      editQuestionSelection: null
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
  }

  handleShow = () => {
    const show = this.state.show
      this.setState({
        show: !show
      })
    }

    handleShowEdit = (question) => {
      const { showEdit } = this.state
      this.setState({
        showEdit: !showEdit,
        editQuestionSelection: question
      })
     }

    handleSelectionStatusChange = (selection,question) => {
      const currentSelection = selection
      //map through the known selection and swap out selection for wanted at known index
      
    }
    
  loadQuestions = () => {
    // console.log('render questions length', this.state.questions.length)
  const questions = this.state.questions
    return questions.map((question, index) => {
      if (question.is_active) {
        return (
          <tr key={ index }>  
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
              <Button size="sm" variant="danger" style = {{ marginLeft: 5, marginRight: 5  }} onClick={ () => this.handleShowEdit(question) }>
                <FontAwesomeIcon icon={faEdit} />
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

  // saveQuestion = (question) => {
  //   let original_questions = Object.assign([], this.state.questions)
  //   let newSet = this.state.newSet
  //   let concatSet = original_questions.concat(newSet)
  //   axios.post("http://localhost:3000/questions", {game_id: question.game_id, description: question.description, is_active: 1, status: 1, selections_attributes: question.selections}).then((response) => {
  //     let data = response.data.question 
  //     console.log('success', data)
  //     newSet.push(data)
  //   })
      
  //   this.setState({
  //     questions: Object.assign([],concatSet)
  //   })
  // }

  handleQuestionAdd = () => {
    console.log("adding question")
    let newArr = Object.assign([],this.state.newQuestionArr)
    console.log(newArr, 'NewArr')
    newArr.map((question) => {
      axios.post("http://localhost:3000/questions", {question: question}).then((response) => {
        let data = response.data.question
        let newQuestions = this.state.newSet
        console.log(data)
        newQuestions.push(data)
        this.setState( prevState => ({
          questions: [...prevState.questions, ...newQuestions],
          newSet: [],
          newQuestionArr: [] 
        }))
        newQuestions.pop()
            console.log(this.state.newQuestionArr)
      })
    })
  }

  handleAddQuestionFromList = (questionArr) => {
    this.setState( prevState => ({
      newQuestionArr: [...prevState.newQuestionArr, ...questionArr]
    }))
  } 

  render() {
    const { game, questions, newQuestions } = this.state
    console.log(this.state.showEdit,this.state.editQuestionSelection)
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
                <h3>Questions 
                <Badge variant="light" style={{ margin: 3 }} >
                   { game && questions.length }
                </Badge>
                </h3>
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
                handleQuestionAddFunc={ this.handleQuestionAdd }
                newQuestionArr = { this.state.newQuestionArr}
                handleAddQuestionFromListFunc={ this.handleAddQuestionFromList }
              />}
              { this.state.question ? <QuestionEdit 
                showEdit={ this.state.showEdit }
                question={ this.state.editQuestionSelection }
                handleShowEditFunc={ this.handleShowEdit }
                inactivateQuestionFunc={ this.inactivateQuestion }
                handleSelectionStatusChangeFunc={ this.handleSelectionStatusChange }
              /> : null }
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



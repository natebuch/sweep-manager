import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Modal } from 'react-bootstrap'
import gameObject from './gameObject'
import { Form } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      selectionList: [],
      addQuestionArr: this.props.newQuestionArr,
      selectionTextInput: "",
      questionDescriptionInput: "",
      questionStatusInput: "",
      questionNewStatusInput: ""
    }
  }
  
  handleChecked = () => {
    const checked = this.state.checked
    this.setState({
      checked: !checked
    })
  }

  handleNewQuestionStatusChange = (e) => {
    this.setState({
      questionNewStatusInput: e.target.value
    });
  }

  handleQuestionDescriptionChange = (e) => {
    this.setState({
      questionDescriptionInput: e.target.value,
    });
  }

  handleSelectionTextChange = (e) => {
    this.setState({
      selectionTextInput: e.target.value,
    });
  }

  handleNewSelection = () => {
    const selections = this.state.selectionList
    const selection = {
      text: this.state.selectionTextInput,
      is_right: this.state.checked
    }
    if (selection.text.length > 0) {
    selections.push(selection)
    this.setState({
      selectionList: selections
    })
    this.clearSelectionChanges()
    } else {window.alert("Selection text cannot be empty.")
    }
  }

  exitQuestionChanges = () => {
    this.setState({
      selectionTextInput: "",
      questionDescriptionInput: "",
      questionStatusInput: "",
      addQuestionArr: [],
      checked: false,
      selectionList: []
    },
    this.props.handleShowFunc
  )}

  clearQuestionChanges = () => {
    this.setState({
      selectionTextInput: "",
      questionDescriptionInput: "",
      questionStatusInput: "",
      checked: false,
      selectionList: []
    }
  )}

  clearSelectionChanges = () => {
    this.setState({
      selectionTextInput: "",
      checked: false
    }
  )}
  
  listSelections = () => {
    const selections = this.state.selectionList
    return (
      <ListGroup> 
        { selections.map((selection,index) => {
          return (
            <ListGroup.Item variant={ selection.is_right ? "success" : "" } key={ index }>
              { selection.text }
            </ListGroup.Item>
          )
          })
        }
      </ListGroup>
    )
  }

  handleQuestionList = () => {
    const questionArr = this.state.addQuestionArr
    const question = {
      game_id: this.props.gameId,
      description: this.state.questionDescriptionInput,
      is_active: 1,
      status: 1,
      selections_attributes: this.state.selectionList,
    }
    if ( question.description.length > 0 && question.selections_attributes.length > 0) {
      questionArr.push(question)
      this.setState({
        addQuestionArr: questionArr
      })
     
      this.clearQuestionChanges()    
    } else {
      window.alert("Question text cannot be empty / You do not have any selections")
    }
  }

  handleRemoveSelection = (index, questionIndex) => {
    const questionArr = this.state.addQuestionArr[questionIndex]
    const selectionArr = questionArr.selections
    selectionArr.splice(index, 1)
    this.setState({  
      ...this.state.addQuestionArr, selections: selectionArr
    })
  }

  handleRemoveQuestion = (index) => {
    const questionArr = this.state.addQuestionArr
    questionArr.splice(index,1)
    this.setState({ 
      addQuestionArr: questionArr
    })
  }

  listQuestions = () => {
    const questions = this.state.addQuestionArr
    return (
      questions.map((question,index) => {
        const questionIndex = index
        return (
          <Card key={questionIndex}>
            <Card.Header as="h5"> 
            <Row>
            <Col md={ 11 }>
            { question.description } 
            </Col>
            <Col md={ 1 } >
            <Button size="sm" variant="light"  style={{float: 'right'}} onClick={ () => { this.handleRemoveQuestion(questionIndex) }}>
              x
            </Button>
            </Col>
            </Row>
            </Card.Header>
              <Card.Body>
                <ListGroup>
                  { question.selections_attributes.map((selection,index) => {
                    return (
                      <ListGroup.Item variant={ selection.is_right ? "success" : "" } key={ index }>
                        <Row>
                          <Col md={ 11 }>             
                            { selection.text }
                          </Col>
                          <Col md={ 1 }>
                            <Button size="sm" variant="danger" style={{ justifyContent: "right"}} onClick={ () => { this.handleRemoveSelection(index, questionIndex) } }>
                              -
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item> 
                    )
                  })}
              </ListGroup>
            </Card.Body>
          </Card>       
        )
      })
    )}      



  addQuestions = () => {
    return (
    <div>
     <Row style={{ marginBottom: "5px"}}>  
        <Col md={ 6 } >
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control as="textarea" rows="1" placeholder="Question Text" value={ this.state.questionDescriptionInput } onChange={ this.handleQuestionDescriptionChange }/>
          </Form.Group>
        </Col>
        <Col>
          <Row>
            <Col md={ 6 }>
            <Form.Label>Selection</Form.Label>
            </Col>
            <Col style={{ display: "flex", alignItems: "center"}} md={ 3 }>
              <Form.Check
                type="switch"
                id="custom-switch" 
                label="correct"
                checked={ this.state.checked }
                onChange={ this.handleChecked }
              /> 
            </Col>
            <Col md={ 3 }>
              <Button size='sm' variant="info" onClick={ this.handleNewSelection } >
                Add Selection
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control as="textarea" rows="1" placeholder="Selection Text" value={ this.state.selectionTextInput } onChange={ this.handleSelectionTextChange }/>
              { this.listSelections() }
            </Col>
          </Row>
          </Col>
         </Row>
     </div>
    )
  }

  clickTest = () => {
    console.log("asdf")
  }

  saveAddQuestions = () => {
    this.exitQuestionChanges()
    this.props.handleQuestionAddFunc()
  }

    render() {
    return ( 
      <div>
        <Modal size="xl" show={ this.props.show } backdrop="static" onHide={ this.exitQuestionChanges }>
          <Modal.Header closeButton>
            <Modal.Title>New Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.listQuestions() }
            <hr/>
            { this.addQuestions() }
          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button variant="primary" onClick={ this.saveAddQuestions } >
                Save questions
              </Button>
            </Col>
            <Col>
              <Button variant="success" className="float-right" onClick={ this.handleQuestionList }>
                Add Question
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
 
export default Questions;

 {/* <td style={{ textAlign: "center"}}>
        <Form>
        <Form.Control id="status-select-add"  as="select" defaultValue={ "default" } onChange={ this.handleNewQuestionStatusChange } >
          <option value="default" disabled >Select a status</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </Form.Control>
        </Form>
      </td> */}
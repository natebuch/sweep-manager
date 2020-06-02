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

class QuestionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      checked: false,
      selectionList: this.props.question.selections,
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

  listSelections = () => {
    const selections = this.props.question.selections
    return (
      <ListGroup> 
        { selections.map((selection,index) => {
          return (
            <ListGroup.Item variant={ selection.is_right ? "success" : "" } key={ index }>
              { selection.text }
              <Form.Check
                type="switch"
                id="custom-switch" 
                label="correct"
                checked={ this.state.checked }
                onChange={ this.handleChecked }
              />
            </ListGroup.Item>
          )
          })
        }
      </ListGroup>
    )
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
    console.log(this.state.addQuestionArr)
    console.log(this.props.newQuestionArr)
    this.clearSelectionChanges()
    } else {window.alert("Selection text cannot be empty.")
    }
  }

  exitQuestionEditChanges = () => {
    this.setState({
      selectionTextInput: "",
      questionDescriptionInput: "",
      questionStatusInput: "",
      checked: false,
      selectionList: [],
      question: this.props.question
    })
    this.props.handleShowEditFunc()  
  }

  editQuestion = () => {
    const { question } = this.props
    return (
    <div>
     <Row style={{ marginBottom: "5px"}}>  
        <Col md={ 6 } >
          <Form.Group>
            <Form.Label>Question</Form.Label>
            <Form.Control as="textarea" rows="1" value={ question.description } onChange={ this.handleQuestionDescriptionChange }/>
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



  render() { 
    console.log(this.state.question)
    return (  
      <Modal size="xl" show={ this.props.showEdit } backdrop="static" onHide={ this.exitQuestionEditChanges }>
          <Modal.Header closeButton>
            <Modal.Title>Edit Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { this.editQuestion() }

          </Modal.Body>
          <Modal.Footer>
            <Col>
              <Button variant="primary" onClick={ this.saveEditQuestion } >
                Save Changes
              </Button>
            </Col>
          </Modal.Footer>
        </Modal>
    );
  }
}
 
export default QuestionEdit;
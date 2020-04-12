import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Modal } from 'react-bootstrap'
import gameObject from './gameObject'
import { Form } from 'react-bootstrap'

class questionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      questions: this.props.qlistEdit,
      newQuestions: this.props.newQuestions,  
      questionDescriptionInput: "",
      questionStatusInput: "",
    }
  }

  loadEditQuestions = () => {
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
          <td>
            <Button variant="danger" style = {{ marginLeft: 5, marginRight: 5 }}>
              -
            </Button>
          </td>
        </tr>
      )
    })
  }

  loadNewQuestions = () => {
    const questions = this.props.newQuestions
      return questions.map((question, index) => {
          return (
        <tr key={ index }>
          <td>
            { question.description }
          </td>
          <td>
            { question.status }
          </td>
          <td>
            <Button variant="danger" style = {{ marginLeft: 5, marginRight: 5 }}>
              -
            </Button>
          </td>
        </tr>
      )
    })
  }

 
    handleQuestionStatusChange = (e) => {
      this.setState({
        questionStatusInput: e.target.value,
      });
    }

    handleQuestionDescriptionChange = (e) => {
      this.setState({
        questionDescriptionInput: e.target.value,
      });
    }
      
    handleQuestionAdd = () => {
      const questionArr = this.state.newQuestions
      const editQuestion = {
        id: null,
        description: this.state.questionDescriptionInput,
        status: this.state.questionStatusInput
      }

      questionArr.push(editQuestion)
      
      this.setState({ 
        newQuestions: questionArr,
        questionDescriptionInput: "",
        questionStatusInput: ""
      })
    }

    clearQuestionChanges = () => {
    const noQuestionChanges = this.props.qlistEdit
      this.setState({
        questions: noQuestionChanges,
        questionDescriptionInput: "",
        questionStatusInput: "",
        newQuestions: []
      })
    }

    addQuestions = () => {
      const { 
        questionDescriptionInput, 
        questionStatusInput,
      } = this.state
    return (
    <tr>
      <td>
        <textarea type="text" placeholder="Question Description" value={ questionDescriptionInput } onChange={ this.handleQuestionDescriptionChange }/>
      </td>
      <td>
        <textarea type="text" placeholder="Question Status" value={ questionStatusInput } onChange={ this.handleQuestionStatusChange }/>
      </td>
      <td>
        <Button variant="success" onClick={ this.handleQuestionAdd }>
          + 
        </Button>
      </td>
    </tr>
    )
  }

   render() {
    console.log(this.state.questions)
    console.log(this.props.qlistEdit)
    const {
      hideModalFunc,
      showModal
    } = this.props

     return ( 
      <div>
        <Modal size="lg" show={ showModal } backdrop="static" onHide={ hideModalFunc } onExit={ () => { this.clearQuestionChanges() } }>
          <Modal.Header closeButton>
            <Modal.Title>Edit Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Table striped bordered hover>
              <tbody>
                { this.loadEditQuestions() }
                { this.loadNewQuestions() }
                { this.addQuestions() }
              </tbody>
            </Table>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ this.props.handleSaveQuestionFunc } >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
 
export default questionEdit;
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
      questions: []
    }
  }

    loadEditQuestions = () => {
      const { qlistEdit } = this.props
      return qlistEdit.map(question => {
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

  addQuestions = () => {
    const { 
      handleQuestionAddFunc,
      handleQuestionDescriptionChangeFunc, 
      handleQuestionStatusChangeFunc, 
      questionDescriptionInput, 
      questionStatusInput,
    } = this.props
    
    return (
    <tr>
      <td>
        <textarea type="text" placeholder="Question Description" value={ questionDescriptionInput } onChange={ handleQuestionDescriptionChangeFunc }/>
      </td>
      <td>
        <textarea type="text" placeholder="Question Status" value={ questionStatusInput } onChange={ handleQuestionStatusChangeFunc }/>
      </td>
      <td>
        <Button variant="success" onClick={ handleQuestionAddFunc }>
          + 
        </Button>
      </td>
    </tr>
    )
  }

  render() { 

    const { show, hideModalFunc, handleSaveQuestion, clearQuestionChangesFunc } = this.props
      return ( 
      <div>
        
        <Modal size="lg" show={show} backdrop="static" onHide={ hideModalFunc } >
          <Modal.Header closeButton onClick={ clearQuestionChangesFunc }>
            <Modal.Title>Edit Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Table striped bordered hover>
              <tbody>
                { this.loadEditQuestions() }
                { this.addQuestions() }
              </tbody>
            </Table>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={ handleSaveQuestion, hideModalFunc } >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
 
export default questionEdit;
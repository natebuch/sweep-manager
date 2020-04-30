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

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  addQuestions = () => {
    return (
    <tr>
      <td>
        <textarea type="text" placeholder="Question Description" value={ this.props.questionDescriptionInput } onChange={ this.props.handleQuestionDescriptionChangeFunc }/>
      </td>
      <td style={{ textAlign: "center"}}>
        <select id="status-select-add"  defaultValue={ "default" } onChange={ this.props.handleNewQuestionStatusChangeFunc } style={{ width: "150px" }}>
          <option value="default" disabled >Select a status</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </td>
    </tr>
    )
  }

    render() {
    return ( 
      <div>
        <Modal show={ this.props.show } backdrop="static" onHide={ this.props.handleShowFunc }>
          <Modal.Header closeButton>
            <Modal.Title>New Question</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Status</th> 
                    </tr>
                  </thead>
                  <tbody>
                    { this.addQuestions()  }
                  </tbody>
                </Table>
              </Form>
            </Modal.Body>
          <Modal.Footer>
            <Button>
              
            </Button>

            <Button variant="primary" onClick={ this.props.handleQuestionAddFunc }>
              Save question
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
 
export default Questions;
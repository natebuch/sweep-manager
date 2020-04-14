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

     render() {
      const  {
        loadQuestionsFunc, 
        loadNewQuestionsFunc, 
        addQuestionsFunc, 
        clearQuestionChangesFunc,
        handleSaveQuestionFunc
      } = this.props
      return ( 
      <div>
        <h3>
          Questions
        </h3>
        <Form>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Question</th>
                <th>Status</th>
                <th>Add/Remove</th>
              </tr>
            </thead>
            <tbody>
              { loadQuestionsFunc }
              { addQuestionsFunc }
            </tbody>
          </Table>
        </Form>
       </div>
    );
  }
}
 
export default Questions;
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

    loadQuestions = () => {
      const { qlistEdit } = this.props
      return qlistEdit.map(question => {
      return (
        <tr>
          <td>
            <input placeholder={ question.description } />
          </td>
          <td>
            <input placeholder={ question.status } />
          </td>
        </tr>
      )
    })
  }

  render() { 

    const { show, hideModalFunc } = this.props
      return ( 
      <div>
        
        <Modal size="lg" show={show} backdrop="static" onHide={ hideModalFunc }>
          <Modal.Header closeButton >
            <Modal.Title>Edit Games</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Game Questions</th>
                  <th>Game Results</th>
                </tr>
              </thead>
              <tbody>
                { this.loadQuestions() }
              </tbody>
            </Table>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
 
export default questionEdit;
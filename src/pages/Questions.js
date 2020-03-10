import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  
  loadQuestions = () => {
    const { qlist }  = this.props
    return qlist.map(question => {
      console.log(question)
      return (
        <tr>
          <td>{ question.description }</td>
          <td>{ question.status }</td>
        </tr>
      )
    })
  }
  
  render() { 
    console.log(this.props)
      return (
        <div>
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
        </div>        
      )
    }
  }

export default Questions;
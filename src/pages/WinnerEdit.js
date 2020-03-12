import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Modal } from 'react-bootstrap'
import gameObject from './gameObject'


class WinnerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {   
      players: []
    }
  }

 
  loadPlayers = () => {
    const { winnerListEdit } = this.props
    console.log(winnerListEdit)
    return winnerListEdit.map(winner => {
      if (winner.sweep === 1) {
        return (
          <tr>
            <td>{ winner.winner_id }</td>
            <td>{ winner.winner_first_name }</td>
            <td>{ winner.winner_last_name }</td>
            <td>{ winner.winner_address }</td>
          </tr>
        )
      }
    })
  }

  render() { 

    const { show, hideModalFunc } = this.props
    
    return (  
      <div>
        <Modal show={show} backdrop="static" onHide={ hideModalFunc }>
          <Modal.Header closeButton >
            <Modal.Title>Edit Winner</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              { this.loadPlayers() }
            </tbody>
          </Table>
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
 
export default WinnerEdit;
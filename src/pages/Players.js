import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'



class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  
  loadPlayerList = () => {
    const  { playerList } = this.props
    return playerList.map(player => {
      return (
        <tr key={ player.id }>
          <td>{ player.id }</td>
          <td>{ player.first_name }</td>
          <td>{ player.last_name }</td>
          <td>{ player.address }</td>
        </tr>
      )  
    })
  }
  
  render() {
      return (
      <div>
        <h3>
          Player List
        </h3>
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
              { this.loadPlayerList() }
            </tbody>
          </Table>
        </div>        
      )
    }
  }

export default Players;
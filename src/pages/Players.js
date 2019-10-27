import React, { Component } from 'react';
import { Table } from 'react-bootstrap'



class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }
  }

  
  loadPlayers = () => {
    const { playerList } = this.props

    return playerList.map(player => {
      return (
        <tr>
          <td>
            { player.id}
          </td>
          <td>
            { player.firstName}
          </td>
          <td>
            { player.lastName}
          </td>
          <td>
            { player.address}
          </td>
        </tr>
      )   
    })
  }
  
  render() { 
    console.log(this.props)
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
              { this.loadPlayers() }
            </tbody>
          </Table>
        </div>        
      )
    }
  }

export default Players;
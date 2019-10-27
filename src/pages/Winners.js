import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

class Winners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winners: [],
    }
  }

  loadWinners = () => {
    const { playerList } = this.props
    const winnerList = []
    
    playerList.map(winner => { 
      if (winner.winner ) {
        winnerList.push(winner)
      }
    })

    return winnerList.map(winner => {   
      return (
        <tr>
          <td>
            { winner.id}
          </td>
          <td>
            { winner.firstName}
          </td>
          <td>
            { winner.lastName}
          </td>
          <td>
            { winner.address}
          </td>
        </tr>
      )   
    })
  }

  loadPrevWinners = () => {
    const { playerList } = this.props
    const prevWinnerList = []
    
    playerList.map(prevWinner => { 
      if (prevWinner.prior_winner ) {
        prevWinnerList.push(prevWinner)
      }
    })

    return prevWinnerList.map(winner => {   
      return (
        <tr>
          <td>
            { winner.id}
          </td>
          <td>
            { winner.firstName}
          </td>
          <td>
            { winner.lastName}
          </td>
          <td>
            { winner.address}
          </td>
        </tr>
      )   
    })
  }
  
  

  render() { 
    console.log(this.props.playerList)
      return (
        <div>
        <h3>
            Current Winner
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
              { this.loadWinners() }
            </tbody>
          </Table> 
          <h3>
            Previous Winners
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
              { this.loadPrevWinners() }
            </tbody>
          </Table>      
        </div>
      )
    }
  }
 
export default Winners;
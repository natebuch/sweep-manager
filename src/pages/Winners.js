import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'

class Winners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevWinners: []
    }
  }

  loadWinners = () => {
    const { winnerList } = this.props
    const winnerListing = []
    winnerList.map(winner => { 
      if (winner.sweep === 1 ) {
        winnerListing.push(winner)
      }
    })
    return winnerListing.map(winner => {   
      return (
        <tr key={ winner.winner_id }>
          <td>
            { winner.winner_id}
          </td>
          <td>
            { winner.winner_first_name}
          </td>
          <td>
            { winner.winner_last_name}
          </td>
          <td>
            { winner.winner_address}
          </td>
        </tr>
      )   
    })
  }
 
  getWinners = () => {
    const { winnerList } = this.props
    const prevWinnerList = this.state.prevWinners
    winnerList.map(prevWinner => { 
      if (prevWinner.sweep === 0 ) {
        prevWinnerList.push(prevWinner)
      }
    })
    this.setState({ 
      prevWinners: prevWinnerList
    })
  }

  loadPrevWinners = () => {
    const { winnerList } = this.props
    const prevWinnerListing = []
    winnerList.map(winner => {
      if (winnerList.sweep === 1 && winnerList)   
    return (
      <tr key={ winner.winner_id }>
        <td>
          { winner.winner_id}
        </td>
        <td>
          { winner.winner_first_name}
        </td>
        <td>
          { winner.winner_last_name}
        </td>
        <td>
          { winner.winner_address}
        </td>
      </tr>
      )  
    })
  }
  
  render() { 
    const { winnerList } = this.props
      return (
        <div>
          <Table size="sm" striped bordered hover>
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
            Previous Game Winners 
            <Badge variant="light" style={{ margin: 3 }} >
              { this.state.prevWinners.length }
            </Badge>
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
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import moment from 'moment';
import gameObject from './gameObject'
import Navbar from 'react-bootstrap/Navbar'



class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      games: null
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/games.json").then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({ games: data.games})
    })
  }

  returnGameList = () => {
    console.log(this.state.games)
    const { games } = this.state
    return games && games.map((game) => {
      return (
        <tr key={ game.id}>
          <td>{ this.gameStatus(game) }</td>
          <td>
            <Link to={{pathname: `/game/${ game.id }`}}>
                { game.id }
            </Link>  
          </td>
          <td>{ game.client.name }</td>
          <td>{ game.team }</td>
          <td>{ game.type }</td>
          <td>{ game.start }</td>
          <td>{ game.end }</td>
        </tr>
      )
    })
  }

  gameStatus = (game) => {
    if (game && game.status === 'Pending') {
        return (
          <Badge variant="primary"> {game.status} </Badge>
        )
    } else if (game && game.status === 'Active') {
      const end = moment(game.end)
        if ( moment().isBefore(end) ) {
          return (
            <Badge variant="success"> {game.status} </Badge>
          )
        } else if ( moment().isAfter(end) && moment().isBefore(end.add(4, 'hours'))) {
          return (
            <Badge variant="warning"> {game.status} </Badge>
          )
        }  else {
          return (
            <Badge variant="danger"> {game.status} </Badge>
          )
        }
    } else if (game && game.status === 'Complete') {
        return (
          <Badge variant="dark"> {game.status} </Badge>
        )
      }
    }

  render() { 
    return (  
      <div>
       <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        </Navbar>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Game Status</th>
                <th>Game ID</th>
                <th>Client</th>
                <th>Game Name</th>
                <th>Game Type</th>
                <th>Game Start Time</th>
                <th>Game End Time</th>
              </tr>
            </thead>
            <tbody>
              { this.returnGameList() }
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}
 
export default GameList;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Jumbotron } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import moment from 'moment';
import gameObject from './gameObject'
import Navbar from 'react-bootstrap/Navbar'



class Games extends Component {
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
          <td>
            <Link to={{pathname: `/game/${ game.id }`}}>
                { game.id }
            </Link>  
          </td>
          <td>{ game.client.name }</td>
          <td>{ this.gameStatus(game) }</td>
          <td>{ game.description }</td>
          <td>{ game.game_type.description }</td>
          <td>{ moment(game.start).format('MMMM Do YYYY, h:mm:ss a')}</td>
        </tr>
      )
    })
  }

  gameStatus = (game) => {
    if (game && game.status.description === 'Pending') {
        return (
          <Badge variant="primary"> {game.status.description} </Badge>
        )
    } else if (game && game.status.description === 'In Progress') {
      const end = moment(game.end)
        if ( moment().isBefore(end) ) {
          return (
            <Badge variant="success"> {game.status.description} </Badge>
          )
        } else if ( moment().isAfter(end) && moment().isBefore(end.add(4, 'hours'))) {
          return (
            <Badge variant="warning"> {game.status.description} </Badge>
          )
        }  else {
          return (
            <Badge variant="danger"> {game.status.description} </Badge>
          )
        }
    } else if (game && game.status.description === 'Closed Out') {
        return (
          <Badge variant="dark"> {game.status.description} </Badge>
        )
      }
    }

  render() { 
    console.log(this.state)
    return (  
      <div>
       <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        </Navbar>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Game ID</th>
                <th>Client</th>
                <th>Game Status</th>
                <th>Game Name</th>
                <th>Game Type</th>
                <th>Game Start Time</th>
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
 
export default Games;
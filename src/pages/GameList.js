import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Game from '../pages/Game'
import { Table } from 'react-bootstrap'
import { Container } from 'react-bootstrap'



class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      games: [
        {
          status: 'Active',
          id: 1, 
          client: 'BudLight',
          team: 'Browns',
          type: 'Slate',
          start: '2019-10-10',
          end: '2019-10-10'
        },
        {
          status: 'Pending',
          id: 2, 
          client: 'BudLight',
          team: 'Patriots',
          type: 'Slate',
          start: '2019-10-10',
          end: '2019-10-10'
        },{
          status: 'Complete',
          id: 3, 
          client: 'BudLight',
          team: 'Browns',
          type: 'Slate',
          start: '2019-10-10',
          end: '2019-10-10'
        }
      ]
    }
  }



  
    
  


  

  render() { 
    
    let gameList  = this.state.games.map((game) => {
      return (
        <tr key={ game.id}>
          <td>{ game.status }</td>
          <td>
            <Link to={{pathname: `/game/${ game.id }`}}>
                { game.id }
            </Link>  
          </td>
          <td>{ game.client }</td>
          <td>{ game.team }</td>
          <td>{ game.type }</td>
          <td>{ game.start }</td>
          <td>{ game.end }</td>
        </tr>
      )
    })


  return (  
    <div>
      <h1>List of Games</h1>
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
          { gameList }
        </tbody>
      
      
      </Table>
      </Container>
          
          {/* <tbody>
          { this.state.games.map((game => {
            return ( 
              <tr>
              <td>
                <Link to={{
                  pathname: `/game/${ game.id }`,
                }}>
                Game {game.homeTeam} vs {game.awayTeam}
                </Link>
                </td>
              </tr>
            ) 
            })
          )}
          </tbody> */}
        
      </div>
    );
  }
}
 
export default GameList;
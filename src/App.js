import React, { Component } from 'react';
import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import GameList from './pages/GameList'
import Game from './pages/Game'

import { BrowserRouter as Router, 
  Route, 
  Switch, 

  Redirect
 } from 'react-router-dom'

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {  }
   }
   render() { 
     return (  
       <Router>
       <Switch>
           <Route exact path="/" component={ MainPage }/>
           <Route exact path="/pageNotFound" component={ PageNotFound } />
           <Route exact path="/gameList" component={ GameList } />
           <Route exact path="/game/:id" component={ Game }/>
           <Redirect to="/pageNotFound" />
         </Switch>
       </Router>
     );
   }
 }
  
 export default App;
import React, { Component } from 'react';
import MainPage from './pages/MainPage'
import PageNotFound from './pages/PageNotFound'
import Games from './pages/Games'
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
           <Route exact path="/games" component={ Games } />
           <Route exact path="/game/:id" component={ Game }/>
           <Redirect to="/pageNotFound" />
         </Switch>
       </Router>
     );
   }
 }
  
 export default App;
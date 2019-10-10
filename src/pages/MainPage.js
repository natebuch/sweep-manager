import React from 'react';
import { Link } from 'react-router-dom'
 
const MainPage = () => {
  
  return (
    <div>
      <h1>Sweep Manager</h1>
      <Link to='/gameList'> Go to Games</Link>
    </div>
  )
}

export default MainPage;
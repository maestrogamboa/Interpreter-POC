import React from 'react'

function NavMenu() {
  return (
    <nav class= "nav">
      <a href= "/" class= "Logo"> 
        Logo  
      </a> 
      <ul> 
        <li> 
          <a href="/"> Home </a> 
        </li>
        <li> 
          <a href="/Assignment"> Assignment </a> 
        </li>
        <li> 
          <a href="/About"> About </a> 
        </li>
        <li> 
          <a href="/Account"> Account </a> 
        </li>
      </ul>
    </nav>
  )
}

export default NavMenu

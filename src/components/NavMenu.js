import React from 'react'

function NavMenu() {
  return (
    <div className='NavContainer'>

  
    <nav class= "nav">
      <a href= "/" class= "Logo"> 
        Logo  
      </a> 
      <ul> 
        <li> 
          <a href="/About"> Interpreter App </a> 
        </li>
        <li> 
          <a href="/Account"> Account </a> 
        </li>
      </ul>
    </nav>
    </div>
  )
}

export default NavMenu

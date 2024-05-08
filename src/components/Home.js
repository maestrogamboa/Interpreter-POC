import React, {useState, useEffect} from 'react'
import NavMenu from "./NavMenu"
import LeftMenu from "./LeftMenu"
import MiddleSection from "./MiddleSection"

function Home(props) { 
const [assignmentClicked, setAssignmentClicked] = useState({})
const [selectedAssignment, setSelectedAssignment] = useState(false)
const assignmentList = props.assignmentList

return (
  <div className="MainContainer">
    <div className="navMenu">
    <NavMenu/>
    </div>
    <div className="mainSections">
      <div className="navMainContainer">
      <LeftMenu assignmentList = {assignmentList} setAssignmentClicked = {setAssignmentClicked} setSelectedAssignment = {setSelectedAssignment}/>
      </div>
      <div className="middleMainContainer">
      <MiddleSection assignmentClicked = {assignmentClicked} selectedAssignment = {selectedAssignment}/>
      </div>
    
    </div>
    </div>
     

);
}

export default Home;

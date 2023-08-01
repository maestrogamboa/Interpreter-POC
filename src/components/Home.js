import React, {useState} from 'react'
import NavMenu from "./NavMenu"
import LeftMenu from "./LeftMenu"
import MiddleSection from "./MiddleSection"

function Home() { 
const [assignmentClicked, setAssignmentClicked] = useState({})
const [selectedAssignment, setSelectedAssignment] = useState(false)

const assignmentList = [{
  title: "assigment 1",
  date: "date",
  instructions: "instructions",
  recording: "recording video",
  language:"Portuguese"
}, 
{
  title: "assigment 2",
  date: "date",
  instructions: "instructions",
  recording: "recording video",
  language:"Spanish"
}]



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

import { useState } from "react";
import LeftMenu from "./components/LeftMenu";
import MiddleSection from "./components/MiddleSection";
import NavMenu from "./components/NavMenu";
import "./app.css"

function App() {

  const [assignmentClicked, setAssignmentClicked] = useState({})
  const assignmentObject = {
    title: "assigment 1",
    date: "date",
    instructions: "instructions",
    recording: "recording video"
  }
  const assignmentList = [assignmentObject]


  return (
    <div className="MainContainer">
      <div className="navMenu">
      <NavMenu/>
      </div>
      <div className="mainSections">
        <div className="navMainContainer">
        <LeftMenu assignmentList = {assignmentList} setAssignmentClicked = {setAssignmentClicked}/>
        </div>
        <div className="middleMainContainer">
        <MiddleSection assignmentClicked = {assignmentClicked}/>
        </div>
      
      </div>
      </div>

  );
}

export default App;

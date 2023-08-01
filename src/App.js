import { useState } from "react";
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom';
import LeftMenu from "./components/LeftMenu";
import MiddleSection from "./components/MiddleSection";
import NavMenu from "./components/NavMenu";
import "./components/NavMenu.css"
import "./app.css"
import Assignment from "./components/Assignment";
import Home from "./components/Home";

function App() {

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
     
      <BrowserRouter>
      <Routes>
      <Route exact path="/startAssignment" element={<Assignment/>} />
      <Route exact path="/" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
        
        
      </div>
       

  );
}

export default App;

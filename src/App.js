import { useState, useEffect} from "react";
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
  const [assignmentList, setAssignmentList] = useState({})
  console.log(assignmentList)
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(true);


  /*const assignmentList = [{
    title: "Assigment 1",
    date: "date",
    instructions: "instructions",
    recording: "recording video",
    language:"Portuguese"
  }, 
  {
    title: "Assigment 2",
    date: "date",
    instructions: "instructions",
    recording: "recording video",
    language:"Spanish"
  }]*/
  
  useEffect(() => {
    const fetchVideos =  async () => {
      try{
        const data =  await fetch("http://127.0.0.1:8080/get_videos_info");
        const jsonData =  await data.json();
        console.log(jsonData)
        setAssignmentList(jsonData)
        setLoading(false)
      }
      catch (error){
        console.error('Error fetching data:', error);
        setIsError(true)
        setLoading(false);
      }
    }
    fetchVideos();
  }, [])

  return (
    <div className="MainContainer">
     
      <BrowserRouter>
      <Routes>
      <Route exact path="/startAssignment" element={<Assignment/>} />
      <Route exact path="/" element={loading ? <p>Loading...</p> : <Home assignmentList={assignmentList} />}/>
      </Routes>
      </BrowserRouter>
        
        
      </div>
       

  );
}

export default App;

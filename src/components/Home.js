import React, {useState, useEffect} from 'react'
import NavMenu from "./NavMenu"
import LeftMenu from "./LeftMenu"
import MiddleSection from "./MiddleSection"

function Home(props) { 
const [assignmentClicked, setAssignmentClicked] = useState({})
console.log("assigment", assignmentClicked)
const [selectedAssignment, setSelectedAssignment] = useState(false)
//const [assignmentList, setAssignmentList] = useState({})

/*const assignmentList = [{
  video_name: "assigment 1",
  due_date: "date",
  instructions: "instructions",
  recording: "recording video",
  language:"Portuguese"
}, 
{
  video_name: "assigment 2",
  due_date: "date",
  instructions: "instructions",
  recording: "recording video",
  language:"Spanish"
}]

useEffect(() => {
  const fetchVideos = async () => {
    try{
      const data = await fetch("http://127.0.0.1:8080/get_videos_info");
      const jsonData = await data.json();
      console.log(jsonData)
      //setAssignmentList(jsonData)
    }
    catch (error){
      console.error('Error fetching data:', error);
      //setIsError(true)
    }
  }
  fetchVideos();
}, [])*/
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

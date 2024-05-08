import { useState, useEffect} from "react";
import { BrowserRouter, Route, Link, Switch, Routes } from 'react-router-dom';
import "./components/NavMenu.css"
import "./app.css"
import Assignment from "./components/Assignment";
import Home from "./components/Home";

function App() {

  const [assignmentList, setAssignmentList] = useState({})
  const [loading, setLoading] = useState(true);


  // fetch video info (google cloud storage)
  useEffect(() => {
    const fetchVideos =  async () => {
      try{
        const data =  await fetch("http://localhost:8080/get_videos_info");
        const jsonData =  await data.json();
        console.log(jsonData)
        setAssignmentList(jsonData)
        setLoading(false)
      }
      catch (error){
        console.error('Error fetching data:', error);
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

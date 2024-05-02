import React, {useRef} from 'react'
import "./MiddleSection.css"
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import video from '../assets/testInterpreterApp.mp4'
import Button from '@mui/material/Button';


function MiddleSection(props) {
  const [MenuValue, setMenuValue] = React.useState(0);
  
  const handleButtonClick = () => {
    // Replace 'https://www.example.com' with the URL you want to open in the new tab
    console.log("clicking")
    window.open('/startAssignment', '_blank');
  };

  return (
    <>
    {props.selectedAssignment ?
    <div className='assignmentDiv'>
     <h1 className='assignmentTitle'>{props.assignmentClicked.title}</h1>
     <h4>Language: {props.assignmentClicked.language}</h4>
    <div className='startAssigment'>
      <Button variant="contained" onClick = {handleButtonClick}>Start Assigment</Button>
    
    </div>
    </div>
    : 
    <div className='mainDiv'>
    <h1 className='assignmentTitleMain'>Welcome User</h1>
    <h4 className='assignmentSubtitleMain'>Click on an assignment to get started</h4>
    </div>
    }
    </>
  )
}

export default MiddleSection
import React, {useRef} from 'react'
import "./MiddleSection.css"
import Button from '@mui/material/Button';


function MiddleSection(props) {
  const handleButtonClick = () => {
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
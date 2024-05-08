import React, {useRef, useState} from 'react'
import "./LeftMenu.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { ListItemButton} from '@mui/material';

function LeftMenu(props) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log(props.assignmentList)

  // select assigment
  const handleClick = (idx, assignment) => {
    setSelectedIndex(idx);
    props.setAssignmentClicked(assignment)
    props.setSelectedAssignment(true)
    sessionStorage.setItem("videoData", JSON.stringify(assignment));
  };
  return (
    <div>
      <h2>Assigments</h2>
      {props.assignmentList.map((assignment, idx) =>
        <div key={idx}>
          { idx >= 1 && <Divider/>}
          <List>
              
                <ListItem
                >
                  <ListItemButton selected={selectedIndex === idx} onClick={() => handleClick(idx, assignment)}>
                  <ListItemText
                    primary={assignment.title}
                    secondary={assignment.due_date}
                  />
                  </ListItemButton>
                  
                </ListItem>
              
            </List>
            
        </div>
      )}
      
    </div>
  )
}

export default LeftMenu

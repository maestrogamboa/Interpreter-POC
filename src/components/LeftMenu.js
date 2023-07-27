import React from 'react'
import "./LeftMenu.css"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function LeftMenu(props) {
  return (
    <div>
      <h2>Assigments</h2>
      {props.assignmentList.map((assignment, idx) =>
        <div>
          { idx >= 1 && <Divider/>}
          <List>
              
                <ListItem
                >
                  <ListItemText
                    primary={assignment.title}
                    secondary={assignment.date}
                  />
                </ListItem>
              
            </List>
            
        </div>
      )}
      
    </div>
  )
}

export default LeftMenu

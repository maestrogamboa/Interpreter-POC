import React from 'react'
import "./MiddleSection.css"
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';


function MiddleSection(props) {
  const [MenuValue, setMenuValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };

  return (
    <div>
     <h3 className='assignmentTitle'>Assigment title</h3>
    <div>
    <TabContext value={MenuValue}>
      <div>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Recording" value="1" />
            <Tab label="Instructions" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
      </div>
      <div>
      <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>

      </div>
      </TabContext>
    
    </div>
    </div>
  )
}

export default MiddleSection
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


function MiddleSection(props) {
  const [MenuValue, setMenuValue] = React.useState(0);
  const videoRef = useRef(null);
  

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };
  const startRecording = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          videoRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
  }};

  return (
    <div>
     <h3 className='assignmentTitle'>Assigment title</h3>
    <div>
    <TabContext value={MenuValue}>
      <div>
      <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Recording" value="1" />
            <Tab label="Instructions" value="2" />
          </TabList>
      </div>
      <div>
      <TabPanel value="1">
        <video width="320" height="240" controls autoPlay>
        <source src={video} type="video/mp4"></source>
        item 1
        </video >
        <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '500px' }}
        autoPlay
        playsInline
        muted // Muting the video to avoid feedback loop
      />
      <button  onClick={startRecording}></button>
      </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
      </div>
      </TabContext>
    
    </div>
    </div>
  )
}

export default MiddleSection
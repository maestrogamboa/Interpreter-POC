import React, {useRef, useState} from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import video from '../assets/testInterpreterApp.mp4'


function Assignment() {
  const [MenuValue, setMenuValue] = React.useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  // const [recordedChunks, setRecordedChunks] = useState([]);
  const recordedChunks = useRef([]);
  console.log("chucks", recordedChunks)
  const videoRef = useRef(null);
  

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };
  const startRecording = async () => {
    try{
      const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true })
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
    
      console.log(stream)
      videoRef.current.srcObject = streamCamera;
    
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        console.log("hitting chunks")
        // setRecordedChunks(chunks);
        recordedChunks.current = chunks
        saveRecording();
        
      };

      recorder.start();
    } catch (error){
      console.log(error)

    }

  };




  const stopRecording = () => {
    if (mediaRecorder) {
      console.log("media is here")
      mediaRecorder.stop();
      setMediaRecorder(null);
      videoRef.current.srcObject = null;
      
    }
    
  };

  const saveRecording = () => {
    if (recordedChunks.length === 0) {
      console.warn('No recording available.');
      return;
    }

    
    const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);

    // Create a link element and set its href and download attributes
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen_recording.webm';

    // Programmatically click the link to start the download
    a.click();
  };

  return (
    <div>
     <h3 className='assignmentTitle'>Assigment title</h3>
    <div>
   
      <div>
      
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
      <button  onClick={startRecording}>Play Button</button>
      <button onClick={stopRecording} > Stop Recording</button>
      </div>
    
    </div>
    </div>
  )
}

export default Assignment

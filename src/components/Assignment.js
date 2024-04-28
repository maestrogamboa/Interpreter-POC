import React, {useRef, useState} from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import video from '../assets/testInterpreterApp.mp4'
import './Assignment.css'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL} from '@ffmpeg/util'


function Assignment() {
  const [MenuValue, setMenuValue] = React.useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioRecorder, setAudioRecorder] = useState(null);
  // const [recordedChunks, setRecordedChunks] = useState([]);
  const recordedChunks = useRef([]);
  const audioRecordedChunks = useRef([]);
  //console.log("chucks", audioRecordedChunks)
  const videoRef = useRef(null);
  const translationVideo = useRef(null);
  //console.log (translationVideo.current)
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  

  const pauseTimes = [50,];

  const timesAndQuestions = {5:'Introduce Yourself', 57:'It sounds like you alrady had an ultrasound today..'};
  
  const handleTimeUpdate = () => {
    const currentTime = Math.floor(translationVideo.current.currentTime);
    setCurrentTime(currentTime);
    if (timesAndQuestions.hasOwnProperty(currentTime)) {
      translationVideo.current.pause();
      setShowQuestion(true);
    }
  };

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };

  const ffmpeg = new FFmpeg();
  
  const extractAudio = async () => {
      // Load ffmpeg
      const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
      
      
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
        workerURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.worker.js`,
          "text/javascript"
        ),
      });
      

  console.log("loading ffmpeg")
  // Read the input file
  await ffmpeg.writeFile('input.mp4', await fetchFile(video));
  console.log("fetching file")
  // Run the ffmpeg command to extract audio
  await ffmpeg.exec('-i', 'input.mp4', 'output.mp3');
  console.log("extracting audio")
  // Read the result
  const data = ffmpeg.readFile('output.mp3');

  // Create a URL for the extracted audio
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
  console.log("creating url to download")

  const o = document.createElement('o');
    o.href = url;
    o.download = 'aduio_recording.webm';

  }

  const translateRecording = async () =>{
    const streamAudio = await navigator.mediaDevices.getUserMedia({ audio: true })

    const audioRecorder = new MediaRecorder(streamAudio);
    setAudioRecorder(audioRecorder);

    const audioChunks = [];
    audioRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    audioRecorder.onstop = async () =>{
      audioRecordedChunks.current = audioChunks
      saveAudioRecording();
      
    }
  }

  const stopTranslateRecording = async () => {
    if (audioRecorder) {
      console.log('stopped recording')
      audioRecorder.stop();
      setAudioRecorder(null);
      //setShowQuestion(false)

      //videoRef.current.srcObject = null;
      
    }

  }


  const startRecording = async () => {
    extractAudio();
    try{
      const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true })
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
    
      console.log(stream)
      videoRef.current.srcObject = streamCamera;
     translationVideo.current.play()
    
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
     translationVideo.current.pause()
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

  const saveAudioRecording = () => {
    if (audioRecordedChunks.length === 0) {
      console.warn('No recording available.');
      return;
    }

    
    const audioBlob = new Blob(audioRecordedChunks.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(audioBlob);
    console.log("blobe done")

    // Create a link element and set its href and download attributes
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audio_recording.wbm';

    // Programmatically click the link to start the download
    a.click();
  }
  return (
    <div>
     <h3 className='assignmentTitle'>Translation Text</h3>
    <div>
   
      <div>
        <center className='videoContainer'>
        <video src={'https://storage.cloud.google.com/eggboa-audi/Spanish%20interpretation%20OBGY%20TVideos%20v1.mp4'} style={{ width: '800px', height:'500px'}}  controls ref= {translationVideo} onTimeUpdate={handleTimeUpdate}/>
        {/* <source src={video} type="video/mp4"></source> */}
      
         <video
        ref={videoRef}
        style={{ width: '600px', height:'500px' }}
        autoPlay
        playsInline
        muted // Muting the video to avoid feedback loop
        /> 
        </center>
        <div className='buttons'>
          <button className='startButton' onClick={startRecording}> Start Recording</button>
          <button className='stopButton' onClick={stopRecording}> Stop Recording</button>
        </div>
      </div>
    
    </div>
    {showQuestion && (

      <div  style={{
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}>
          <h2>Translate</h2>
            <p>What is the capital of France?</p>
            <button type="StartRecord" onClick={translateRecording}>Translate</button>
            <button type="StopRecord" onClick={stopTranslateRecording}>Stop Recording</button>
      </div>

    )}
    </div>
  )
}

export default Assignment

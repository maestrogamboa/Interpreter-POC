import React, {useRef, useState, useEffect} from 'react'
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
import Button from '@mui/material/Button';


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
  const videoURL = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [score, setScore] = useState({});
  console.log(score.score)
  const [question, setQuestion] = useState(null);
  const [isResponseReady, setIsResponseReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  console.log('isVideoReady', isVideoReady)
  console.log('isResponseReady', isResponseReady)
  console.log('showQuestion', showQuestion)
  
  console.log('questiooon', question)
  const interpretation = useRef("");
  console.log(interpretation)

  
  

  
  
  

  const fetchVideoURL = async () => {
    const video_information = sessionStorage.getItem('videoData')
    const parsedVideoInfo = JSON.parse(video_information)

    const body_data = {"video_name": parsedVideoInfo.video_name}
    console.log(body_data)
    const request = await fetch("http://localhost:8080/get_video",{method:"POST",
     headers:{ 'Content-Type': 'application/json'},
     body: JSON.stringify(body_data)
    })
    const data = await request.json()
    videoURL.current = data.videoURL
    setIsVideoReady(true)

  }

  useEffect( () => {
  fetchVideoURL()
  }, [])
  const pauseTimes = [57,64,70];

  let timesAndQuestions = [{'time': 57, "textToTranslate":'It sounds like you already had an ultrasound today', "LanguageTo":"spanish", 'stopped':false},
   {'time': 64, "textToTranslate":'and most of that went well', "LanguageTo":"spanish", 'stopped':false},
    {'time': 70, "textToTranslate":'so, Im just going to start by checking your breathing and lungs first', "LanguageTo":"spanish", 'stopped':false}];

    let stoppedTimes = [];

    const handleTimeUpdate = () => {
      const currentTime = Math.floor(translationVideo.current.currentTime);
      setCurrentTime('currentTime', currentTime);
    
      if (pauseTimes.includes(currentTime)) {
        // Perform actions when the current time matches a number in pauseTimes
        translationVideo.current.pause();
        const item = timesAndQuestions.find(item => item.time == currentTime);
        console.log('iteem', item)
        setShowQuestion(true);
        setQuestion(item);
        // You may also set other state variables or perform additional actions here
      }
    };
    
    /*const handleTimeUpdate = () => {
      const currentTime = Math.floor(translationVideo.current.currentTime);
      setCurrentTime('currentTime', currentTime);
    
      // Log current time for debugging
      console.log('Current Time:', currentTime);
    
      const index = timesAndQuestions.findIndex(item => Math.abs(item.time - currentTime) < 0.001 && !stoppedTimes.includes(item.time));
    
      console.log('Index:', index);
    
      if (index !== -1) {
        const item = timesAndQuestions[index];
        console.log('Found item:', item);
    
        // Update the stopped property of the found item
        stoppedTimes.push(item.time);
        console.log('Stopped times:', stoppedTimes);
    
        // Perform other actions
        translationVideo.current.pause();
        setShowQuestion(true);
        setQuestion(item);
      } else {
        console.log('Item not found or already stopped.');
      }
     /*const index = timesAndQuestions.findIndex(item => Math.abs(item.time - currentTime) === 0.000  && !item.stopped); // Find index of the item
    if (index !== -1) {
      const item = timesAndQuestions[index];
      item.stopped = true; // Change the stopped property to true
      console.log('Updated item:', item); // Log the updated item
      translationVideo.current.pause();
      setShowQuestion(true);
      setQuestion(item);
    }
   if (timesAndQuestions.hasOwnProperty(currentTime)) {
      translationVideo.current.pause();
      setShowQuestion(true);
    }
  };*/

  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };

  const ffmpeg = new FFmpeg();
  
  /* const extractAudio = async () => {
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

  }*/


  const translateRecording = async () =>{
    setShowQuestion(false)
    setIsRecording(true)
   try{
    const streamAudio = await navigator.mediaDevices.getUserMedia({ audio: true, video:false})
  
    const audioRecorder = new MediaRecorder(streamAudio, {mimeType : 'audio/webm'});
    setAudioRecorder(audioRecorder);
    console.log(audioRecorder)

    const audioChunks = [];
    audioRecorder.ondataavailable = (event) => {
      console.log('theres data')
      audioChunks.push(event.data);
    };

    audioRecorder.start()

    audioRecorder.onstop = async () =>{
      audioRecordedChunks.current = audioChunks
      console.log(audioChunks)
      console.log("hitting here")
      const audioBlob = new Blob(audioRecordedChunks.current, { type: 'audio/flac' }); // Change type to 'audio/flac'
      const formData = new FormData();
      const audioTest = formData.get('audio')
      formData.append('audio', audioBlob);
      console.log(formData.get('audio'))
      //saveAudioRecording();

      try {
        const data =  await fetch("http://127.0.0.1:8080/audio_to_text", {
          method: 'POST',
          
          body:formData,
        })
        const response = await data.json()
        interpretation.current = response.text
        getScore()
        setIsRecording(false)
        setIsResponseReady(true)
        
        
        console.log("response", response.text)
      }
        catch (error){
          console.log(error)
        }
      
    }}
    catch(e) {
      console.log(e)
    }
  }

  const getScore =  async () => {
   const body_data = {"sentence_to":question.textToTranslate,
  'interpretation':interpretation.current}
  console.log('body_dataa', body_data)
    try {const score =  await fetch("http://127.0.0.1:8080/interpret", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
          body:JSON.stringify(body_data),
        })

        const response = await score.json()
        setScore(response)
        console.log('score', response)
      }
      catch (e){
        console.log(e)
      }
  }

  const ContinueVideo = () => {
    setIsResponseReady(false)
    setScore({})
    translationVideo.current.play()
  }


  const stopTranslateRecording =  () => {
    if (audioRecorder) {
      console.log(audioRecorder)
      console.log('stopped recording')
      audioRecorder.stop();
      setAudioRecorder(null);
      //setShowQuestion(false)
      

      //videoRef.current.srcObject = null;
      
    }

  }


  const startRecording = async () => {
    //extractAudio();
    try{
      const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true })
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // set contorl to false
      
      console.log(stream)
      videoRef.current.srcObject = streamCamera;
      //setIsCameraOn(true)
     translationVideo.current.play()
    
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      

      const chunks = [];
      recorder.ondataavailable = (event) => {
        console.log('video data')
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
        console.log("hitting chunks")
        // setRecordedChunks(chunks);
        recordedChunks.current = chunks
        
        saveRecording();
        
      };

      recorder.start();
      setIsCameraOn(true)
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
    a.download = 'screen_recording.mp3';

    // Programmatically click the link to start the download
    a.click();
  };

  const saveAudioRecording = () => {
    if (audioRecordedChunks.length === 0) {
      console.warn('No recording available.');
      return;
    }

    
    const audioBlob = new Blob(audioRecordedChunks.current, { type: 'audio/mp3' });
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
      {isVideoReady && (
        <div>
          <h3 className='assignmentTitle'>Translation Text</h3>
          <div>
            <center className='videoContainer'>
              <video src={videoURL.current} style={{ width: '800px', height:'500px'}} controls ref={translationVideo} onTimeUpdate={handleTimeUpdate}/>
              <video
                ref={videoRef}
                style={{ width: '600px', height:'500px', backgroundColor:'#ccc'}}
                autoPlay
                playsInline
                muted // Muting the video to avoid feedback loop
                placeholder='video'
              />
            </center>
            <div className='buttons'>
              <button className='startButton' onClick={startRecording}>Start Recording</button>
              <button className='stopButton' onClick={stopRecording}>Stop Recording</button>
            </div>
          </div>
        </div>
      )}
      {showQuestion ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '50%',
          height: '50%'
        }}>
          <h2 style={{
            width: '100%',
            textAlign: 'center',
          }}>Please interpret to {question.LanguageTo}</h2>
          <p style={{
            width: '100%',
            textAlign: 'center',
            marginBottom: '40px',
            fontSize: '25px'
          }}>{question.textToTranslate}</p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}>
            <Button onClick={translateRecording} variant="contained">Record</Button>
          </div>
        </div>
      ) : isResponseReady ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '50%',
          height: '50%'
        }}>
          {score.score ? <h2 style={{
            width: '100%',
            textAlign: 'center',
          }}>Result : {score.score}<br></br>Your said: {interpretation.current}</h2> : <h2 style={{
            width: '100%',
            textAlign: 'center',
          }}> Scoring response..</h2>}
          <Button onClick={ContinueVideo} variant="contained">Continue</Button>
        </div>
      ) : isRecording ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '50%',
          height: '50%'
        }}>
          <h2 style={{
            width: '100%',
            textAlign: 'center',
          }}>Recording ...</h2>
          <Button onClick={stopTranslateRecording} variant="outlined" color='error'>Stop Recording</Button>
        </div>
      ): null
    }
    </div>
  );
}

export default Assignment

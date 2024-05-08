import React, {useRef, useState, useEffect} from 'react'
import './Assignment.css'
import Button from '@mui/material/Button';


function Assignment() {
  const [MenuValue, setMenuValue] = React.useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioRecorder, setAudioRecorder] = useState(null);
  // const [recordedChunks, setRecordedChunks] = useState([]);
  const recordedChunks = useRef([]);
  const audioRecordedChunks = useRef([]);
  const videoRef = useRef(null);
  const translationVideo = useRef(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const videoURL = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [score, setScore] = useState({});
  const [question, setQuestion] = useState(null);
  const [isResponseReady, setIsResponseReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const interpretation = useRef("");


  const fetchVideoURL = async () => {
    const video_information = sessionStorage.getItem('videoData')
    const parsedVideoInfo = JSON.parse(video_information)

    const body_data = {"video_name": parsedVideoInfo.video_name}
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
    
      if (pauseTimes.includes(currentTime)) {
        // Perform actions when the current time matches a number in pauseTimes
        translationVideo.current.pause();
        const item = timesAndQuestions.find(item => item.time == currentTime);
        setShowQuestion(true);
        setQuestion(item);
        // You may also set other state variables or perform additional actions here
      }
    };
    
  const handleChange = (event, newValue) => {
    setMenuValue(newValue);
  };

  const translateRecording = async () =>{
    setShowQuestion(false)
    setIsRecording(true)
   try{
    const streamAudio = await navigator.mediaDevices.getUserMedia({ audio: true, video:false})
  
    const audioRecorder = new MediaRecorder(streamAudio, {mimeType : 'audio/webm'});
    setAudioRecorder(audioRecorder);

    const audioChunks = [];
    audioRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    audioRecorder.start()

    audioRecorder.onstop = async () =>{
      audioRecordedChunks.current = audioChunks
      const audioBlob = new Blob(audioRecordedChunks.current, { type: 'audio/flac' }); // Change type to 'audio/flac'
      const formData = new FormData();
      const audioTest = formData.get('audio')
      formData.append('audio', audioBlob);
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
    try {const score =  await fetch("http://127.0.0.1:8080/interpret", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Specify content type as JSON
        },
          body:JSON.stringify(body_data),
        })

        const response = await score.json()
        setScore(response)
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
      audioRecorder.stop();
      setAudioRecorder(null);
      
    }

  }


  const startRecording = async () => {
    try{
      const streamCamera = await navigator.mediaDevices.getUserMedia({ video: true })
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // set contorl to false
      videoRef.current.srcObject = streamCamera;
      translationVideo.current.play()
    
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = async () => {
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
          <h3 className='assignmentTitle'>Assignment Page</h3>
          <div>
            <center className='videoContainer'>
              <video src={videoURL.current} className='mainVideo' controls ref={translationVideo} onTimeUpdate={handleTimeUpdate}/>
              <video
                ref={videoRef}
                className='videoRecording'
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
        <div className='questionDiv'>
          <h2 className='questionHeader'>Please interpret to {question.LanguageTo}</h2>
          <p className='questionP'>{question.textToTranslate}</p>
          <div className='buttonDiv'>
            <Button onClick={translateRecording} variant="contained">Record</Button>
          </div>
        </div>
      ) : isResponseReady ? (
        <div className='questionDiv'>
          {score.score ? <h2 className='questionHeader'>Result : {score.score}<br></br>Your said: {interpretation.current}</h2> : <h2 className='questionHeader'>
             Scoring response..</h2>}
          <Button onClick={ContinueVideo} variant="contained">Continue</Button>
        </div>
      ) : isRecording ? (
        <div className='questionDiv'>
          <h2 className='questionHeader'>Recording ...</h2>
          <Button onClick={stopTranslateRecording} variant="outlined" color='error'>Stop Recording</Button>
        </div>
      ): null
    }
    </div>
  );
}

export default Assignment

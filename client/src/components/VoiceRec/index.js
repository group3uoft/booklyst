import React, {useEffect} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Dictaphone({setVoiceSearch}) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setVoiceSearch(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
      {/* <button onClick={SpeechRecognition.startListening}></button> */}
      <span className="btn btn-light sp-btn w-100 border-input"
      onClick={SpeechRecognition.startListening}
      ><i className="fas fa-microphone-alt"></i></span>
      {/* <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
      {/* <button onClick={resetTranscript}>Reset</button> */}
    </div>
  );
};
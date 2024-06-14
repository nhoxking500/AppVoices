import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { useSpeech } from './lib/useSpeech';
import { fetchContent, parseContentIntoSentences } from './lib/content';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentSentenceIdx, currentWordRange, playbackState, play, pause } = useSpeech(sentences);

  const loadNewContent = () =>{
    fetchContent().then((content)=>{
      setSentences(parseContentIntoSentences(content));
    })
  }

  useEffect(()=>{
    loadNewContent();
  },[])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading sentences={sentences} currentSentenceIdx={currentSentenceIdx} currentWordRange={currentWordRange}/>
      </div>
      <div>
        <Controls play={play} pause={pause} state={playbackState} loadNewContent={loadNewContent}/>
      </div>
    </div>
  );
}

export default App;

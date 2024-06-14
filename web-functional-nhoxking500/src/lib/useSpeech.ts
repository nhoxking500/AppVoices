import { useEffect, useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number,number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("initialized");

  const maxLengthSentences = sentences.length - 1 ;

  const handleBoundary = (e: SpeechSynthesisEvent) =>{
    setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
  }
  const handleEnd = (e: SpeechSynthesisEvent) =>{
    maxLengthSentences > currentSentenceIdx ? setCurrentSentenceIdx((prev) => prev + 1) : setCurrentSentenceIdx(-1);
  }
  const handleUpdateState = (state : PlayingState) =>{
    setPlaybackState(state);
  }

  const {play,pause, load, cancel} = createSpeechEngine({
    onBoundary: handleBoundary,
    onEnd: handleEnd,
    onStateUpdate: handleUpdateState,
  })

  useEffect(()=>{
    load(sentences[currentSentenceIdx])
  },[sentences,currentSentenceIdx])

  useEffect(()=>{
    playbackState === "ended" && maxLengthSentences >= currentSentenceIdx && currentSentenceIdx > -1 && play()
  },[playbackState])

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play:()=>{
      load(sentences[currentSentenceIdx]);
      play();
    },
    pause,
  };
};

export { useSpeech };

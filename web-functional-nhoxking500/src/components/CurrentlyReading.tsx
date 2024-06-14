import { useEffect, useState } from "react";

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const [curWord,setCurWord] = useState<string>("");

  useEffect(()=>{
    if(sentences.length > 0)
    {
      const sentence = sentences[currentSentenceIdx];
      const currentWord = sentence?.slice(currentWordRange[0],currentWordRange[1]);
      setCurWord(currentWord);
    }
  },[currentWordRange, currentSentenceIdx, sentences])

  return <div data-testid="currently-reading">
    <div data-testid="current-sentence" style={{fontSize:"18px"}}>
      {
        sentences[currentSentenceIdx]?.split(" ").map((word,index)=>{
          const isHighLight = word === curWord;
          return(
            <span
              key={index}
              data-testid={isHighLight ? "current-word" :""}
              style={{
                color: isHighLight ?"red" : "black",
                fontWeight: isHighLight ? "bold" : "normal"
              }}
            >
              {word}{" "}
            </span>
          )
        })
      }
    </div>
    <br />
    <div>{sentences.join(" ")}</div>
  </div>;
};

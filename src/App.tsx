import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * components & utils
 */

import SampleText from './components/SampleText/SampleText';
import wordRegex from './utils/utils';

/**
 * enums & interfaces
 */

enum HighlightColor {
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
}

interface SelectedColors {
  HighlightColor: string[];
}

interface SelectedTextGroup {
  [key: string]: string[];
}

// interface SelectedState {
//   selected: { [key: HighlightColor]: string[];}
// }

/**
 * app
 */

const App: React.FC = () => {
  const [mouseIsClicked, setMouseIsClicked] = useState<boolean>();
  const [selectGroup, setSelectGroup] = useState<number>(0);
  const [selectedTextGroups, setSelectedTextGroups] = useState<SelectedTextGroup>({});
  // const [selectedText, setSelectedText] = useState<string[]>([]);

  // const checkIfTextInState = (txt: string) => {
  //   return selectedText.includes(txt);
  // };

  /**
   * Function to check if selected textID is already somewhere in the selectedTextGroups state
   * @param txt - string to check for
   */
  const checkIfHighlighted = (txt: string) => {
    return Object.values(selectedTextGroups).filter((group) => group.includes(txt)).length > 0;
  };

  const checkIfColorInState = (color: HighlightColor) => {};

  /**
   * Function that returns true | false if select-group for current
   * text selection exists in the state
   * @param groupName - name of select group to check
   */
  const selectGroupExists = (groupName: string) => {
    if (typeof selectedTextGroups[groupName] === 'undefined') {
      return false;
    } else {
      return true;
    }
  };

  /**
   * Function that handles the text selection
   * 1. drag mouse over text
   * 2. if text is tagged, do nothing
   * 3. if text is NOT tagged, process with functions above
   *
   * 4. if passing tests above...
   * 5. add text to state
   * 6. mark html with color tag
   *
   * @param e - Drag event over target text
   */
  const handleSelectText = (e: React.MouseEvent) => {
    const t = e.currentTarget as HTMLElement;
    const targetID = t.id || '';

    e.preventDefault();

    if (mouseIsClicked) {
      if (targetID.match(/mappedWord/) !== null) {
        /**
         * 1. Below a check should be done to see if there is an empty group by the same name
         * 2. If there is, append to it
         */
        if (selectGroupExists(`group${selectGroup}`)) {
          setSelectedTextGroups({
            ...selectedTextGroups,
            [`group${selectGroup}`]: [...selectedTextGroups[`group${selectGroup}`], targetID],
          });
        } else {
          setSelectedTextGroups({
            ...selectedTextGroups,
            [`group${selectGroup}`]: [targetID],
          });
        }
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (mouseIsClicked) {
      setMouseIsClicked(false);
    }

    if (selectGroupExists(`group${selectGroup}`)) {
      setSelectGroup(selectGroup + 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!mouseIsClicked) {
      setMouseIsClicked(true);
    }
  };

  /**
   * Function that maps an input string to something selectable
   * 1. check if string contains spaces
   * 2. separate string into array of spaces and words/charactes
   * 3. map over array of words/characters
   * 4. replace words with <span></span>
   *
   * Punctuation: [,.-:;]
   *
   * @param str - any string constant/variable
   */
  const mapStrToSpan = (str: string) => {
    return str
      .replace(wordRegex, '@*@$1@*@')
      .split('@*@')
      ?.map((mappedWord: string, i) => {
        if (mappedWord?.match(wordRegex) !== null) {
          return (
            <span
              key={`mappedWord${i}`}
              id={`mappedWord${i}`}
              onMouseOver={handleSelectText}
              data-selected-color=''
              data-selected-group=''
              className={`additionalClass 
                ${
                  checkIfHighlighted(`mappedWord${i}`) ? `selected--${HighlightColor.Orange}` : ''
                }`}>{`${mappedWord}`}</span>
          );
        } else {
          return mappedWord;
        }
      });
  };

  useEffect(() => {
    mapStrToSpan(SampleText);
  });

  /**
   * RETURN
   */
  return (
    <div className='App'>
      <header>
        <p>Jasper's test highlithging</p>
      </header>
      <main
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }}>
        {mapStrToSpan(SampleText)}
      </main>
    </div>
  );
};

export default App;

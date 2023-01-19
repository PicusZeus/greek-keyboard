import classes from "./TypingArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { keyboardActions } from "../../store";
import {
  keyboard_gr_map,
  keyboard_eng_map_cons,
  keyboard_eng_map_diacr,
  keyboard_eng_map_vow,
} from "../../assets/KeyboardGrMap";
import { texts } from "../../assets/TextsToType";
import { Fragment } from "react";

import {
  SHIFT,
  SPACE,
  CAPSLOCK,
  DEAD,
  TAB,
  ACUTE,
  DIAERESIS,
} from "../../assets/Variables";

const TypingArea = (props) => {
  const ref = useRef(null);

  const [selectionStartGreek, selectionStartSetter] = useState(0);

  const [isComposing, isComposingSetter] = useState(false);

  const [composingElement, composingElementSetter] = useState(null);

  const dispatch = useDispatch();

  const language = useSelector((state) => state.language);

  const inputText = useSelector((state) => state.inputText);

  const letterAfterDead = useSelector((state) => state.shouldDead);

  const letterAfterShiftDead = useSelector((state) => state.shouldShiftDead);

  const letterAfterShiftWDead = useSelector((state) => state.shouldShiftWDead);

  useEffect(() => {
    const element = ref.current;
    element.setSelectionRange(selectionStartGreek, selectionStartGreek);
  }, [selectionStartGreek]);

  const singleCharAwaited = (awaitedChar) => {
    if (!awaitedChar) {
      return null;
    } else if (awaitedChar === " ") {
      dispatch(keyboardActions.keyToBeClicked(SPACE));
    } else if (awaitedChar in keyboard_gr_map) {
      const char = keyboard_gr_map[awaitedChar];

      dispatch(keyboardActions.keyToBeClicked(char[0]));
      if (SHIFT in char) {
        dispatch(keyboardActions.shouldShiftOn());
      }
    } else if (awaitedChar.toLowerCase() in keyboard_gr_map) {
      const char = keyboard_gr_map[awaitedChar.toLowerCase()];
      dispatch(keyboardActions.keyToBeClicked(char[0]));
      dispatch(keyboardActions.shouldShiftOn());
    } else {
      // not greek char
      const lat_regexp = /[A-z\u00C0-\u00ff]+/g;
      if (awaitedChar.lower !== awaitedChar && lat_regexp.test(awaitedChar)) {
        dispatch(keyboardActions.keyToBeClicked(awaitedChar.toLowerCase()));
        dispatch(keyboardActions.shouldShiftOn());
      } else if (lat_regexp.test(awaitedChar)) {
        dispatch(keyboardActions.keyToBeClicked(awaitedChar));
      }
    }
  };

  const combinedCharAwaited = (awaitedChar) => {
    if (awaitedChar.includes(ACUTE) && awaitedChar.includes(DIAERESIS)) {
      // there is some difference between win and linux, I will use win binding
      dispatch(keyboardActions.keyToBeClicked("w"));
      dispatch(keyboardActions.shouldShiftOn());
      const charStripped = awaitedChar
        .replace(ACUTE, "")
        .replace(DIAERESIS, "");
      dispatch(keyboardActions.shouldShiftWDeadOn(charStripped));
    } else if (awaitedChar.includes(ACUTE)) {
      const charStripped = awaitedChar.replace(ACUTE, "");
      dispatch(keyboardActions.keyToBeClicked(DEAD));
      dispatch(keyboardActions.shouldDeadOn(charStripped));
    } else if (awaitedChar.includes(DIAERESIS)) {
      const charStripped = awaitedChar.replace(DIAERESIS, "");
      dispatch(keyboardActions.keyToBeClicked(DEAD));
      dispatch(keyboardActions.shouldShiftOn());
      dispatch(keyboardActions.shouldShiftDeadOn(charStripped));
    }
  };

  const charAwaitedHandler = (index) => {
    if (index >= texts[props.difficulty].length) {
      return null;
    }
    let awaitedChar = texts[props.difficulty][index];
    const unicodeChar = awaitedChar.normalize("NFD");

    if (unicodeChar.length > 1) {
      combinedCharAwaited(unicodeChar);
    } else {
      singleCharAwaited(unicodeChar);
    }
  };
  const keyboard_eng_map = {
    ...keyboard_eng_map_vow,
    ...keyboard_eng_map_cons,
  };

  const inputGreekSetter = (value, char, selstart) => {
    let newChar = char;
    if (
      typeof char === "string" &&
      char.toLowerCase() in { ...keyboard_eng_map, ...keyboard_eng_map_diacr }
    ) {
      if (isComposing) {
        if (char.toLowerCase() in keyboard_eng_map_vow) {
          if (char.toLowerCase() !== char) {
            newChar = keyboard_eng_map_vow[char.toLowerCase()][0].toUpperCase();
          } else {
            newChar = keyboard_eng_map_vow[char][0];
          }
          newChar = (newChar + composingElement[0]).normalize("NFC");
          isComposingSetter(false);

          // newValue = value.slice(0, -1) + newChar;
        } else {
          newChar = composingElement[1];
          isComposingSetter(false);
          // newValue = value.slice(0, -1) + detachedDiacritic;
        }
      } else if (char in keyboard_eng_map_diacr) {
        composingElementSetter(keyboard_eng_map_diacr[char]);
        isComposingSetter(true);
        newChar = "";
        // newValue = value.slice(0, -1);
      } else if (char in keyboard_eng_map) {
        newChar = keyboard_eng_map[char][0];
      } else if (char.toLowerCase() in keyboard_eng_map) {
        newChar = keyboard_eng_map[char.toLowerCase()][0].toUpperCase();

        // newValue = value.slice(1, -1) + upperCaseChar;
      }


      const textBefore = value.slice(0, selstart - 1);
      const textAfter = value.slice(selstart);
      const newValue = [textBefore, newChar, textAfter].join("");

      dispatch(keyboardActions.updateInputText(newValue));

    } else {
      dispatch(keyboardActions.updateInputText(value));
    }

    dispatch(keyboardActions.clearShouldBeClicked());
  };

  const inputTextHandler = (event, value) => {

    const selectionStart = event.target.selectionStart;
    selectionStartSetter(selectionStart);
    console.log('onChange')
    let char = event.nativeEvent.data;
    const re = new RegExp("[a-zA-Z|;:]");
    if (language === "gr" && re.exec(char)) {
      inputGreekSetter(value, char, selectionStart);
    } else {
      dispatch(keyboardActions.updateInputText(value));
    }
  };
  let inputChar = null;
  const keyDownHandler = (event) => {
    console.log('DOWN', event.altKey, event.key)
    if (event.altKey && event.key === 'Shift') {
      dispatch(keyboardActions.keyClicked('Alt'))
      dispatch(keyboardActions.keyClicked('Shift'))
      dispatch(keyboardActions.changeLanguage())
    }
    if (event.key === TAB) {
      event.preventDefault();
dispatch(keyboardActions.keyClicked(event.key));
      const el = event.target
      const slStart = el.selectionStart
      const newChar = '   '
      const textBefore = el.value.slice(0, slStart);
      const textAfter = el.value.slice(slStart);
      console.log(textBefore, textAfter)
      const newValue = [textBefore, newChar, textAfter].join("");
      console.log('res', newValue)
      dispatch(keyboardActions.updateInputText(newValue));
      // dispatch(keyboardActions.updateInputText(inputText.slice(0, selectionStartGreek) + "   " + inputText.slice(selectionStartGreek)));

      selectionStartSetter(slStart+3)
    } else if (event.key === CAPSLOCK) {
      dispatch(keyboardActions.capslockToggle());
      dispatch(keyboardActions.keyClicked(event.key));
    } else if (event.key === SHIFT) {
      dispatch(keyboardActions.shiftOn());
      dispatch(keyboardActions.keyClicked(event.key));
    } else if (event.keyCode === 32) {
      dispatch(keyboardActions.keyClicked(SPACE));
    } else {
        dispatch(keyboardActions.keyClicked(event.key))
    }
  };

  const keyUpHandler = (event) => {
    if (event.keyCode === 186) {
      // acute clicked
      singleCharAwaited(letterAfterDead);
      dispatch(keyboardActions.shouldDeadOff());
    } else if (event.keyCode === 186 && event.shiftKey) {
      singleCharAwaited(letterAfterShiftDead);
      dispatch(keyboardActions.shouldShiftDeadOff());
    } else if (event.keyCode === 87 && event.shiftKey) {
      singleCharAwaited(letterAfterShiftWDead);
      dispatch(keyboardActions.shouldShiftWDeadOff());
    } else if (event.keyCode === 16) {
      dispatch(keyboardActions.shiftOff());
      dispatch(keyboardActions.keyClicked(event.key));
    } else if (event.keyCode === 32) {
      dispatch(keyboardActions.keyReleased(SPACE));
    } else if (event.key in keyboard_gr_map) {
      dispatch(keyboardActions.keyReleased(keyboard_gr_map[event.key][0]));
    } else {
      dispatch(keyboardActions.keyReleased(event.key));
    }
  };

  const prepareTextArea = (event) => {
    charAwaitedHandler(inputText.length);
    if (event.getModifierState(CAPSLOCK)) {
      dispatch(keyboardActions.capslockOn());
    } else {
      dispatch(keyboardActions.capslockOff());
    }
  };
  const handlerInput = (event) => {
  };
  return (
    <Fragment>
      <textarea
        id="textarea"
        wrap={"hard"}
        cols={5}
        rows={5}
        placeholder={"Zacznij pisać tutaj"}
        className={classes.textArea}
        value={inputText}
        onChange={(event) => inputTextHandler(event, event.target.value)}
        onKeyDownCapture={(event) => keyDownHandler(event)}
        onKeyUpCapture={keyUpHandler}
        onClick={prepareTextArea}
        onInput={(event) => handlerInput(event)}
        ref={ref}
      />

      {/*<EvaluatedText*/}
      {/*  value={inputText}*/}
      {/*  difficulty={props.difficulty}*/}
      {/*  resetText={resetTextHandler}*/}
      {/*/>*/}
    </Fragment>
  );
};

export default TypingArea;

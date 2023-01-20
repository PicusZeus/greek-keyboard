import classes from "./TypingArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { keyboardActions } from "../../store";
import {
  keyboard_gr_map,
  keyboard_eng_map_cons,
  keyboard_eng_map_diacr,
  keyboard_eng_map_vow,
  keyboard_greek_to_latin,
  altNonLetterKeys,
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

  const letterToGetAccent = useSelector((state) => state.shouldAcute);

  const letterToGetDiaeresis = useSelector((state) => state.shouldDiaeresis);

  const letterToGetDiaeresisWithAcute = useSelector(
    (state) => state.shouldDiaeresisWithAcute
  );
  const keyboard_eng_map = {
    ...keyboard_eng_map_vow,
    ...keyboard_eng_map_cons,
  };

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
      dispatch(keyboardActions.shouldDiaeresisWithAcuteOn(charStripped));
    } else if (awaitedChar.includes(ACUTE)) {
      const charStripped = awaitedChar.replace(ACUTE, "");
      dispatch(keyboardActions.keyToBeClicked(DEAD));
      dispatch(keyboardActions.shouldAcuteOn(charStripped));
    } else if (awaitedChar.includes(DIAERESIS)) {
      const charStripped = awaitedChar.replace(DIAERESIS, "");
      dispatch(keyboardActions.keyToBeClicked(DEAD));
      dispatch(keyboardActions.shouldShiftOn());
      dispatch(keyboardActions.shouldDiaeresisOn(charStripped));
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
  const inputGreekSetter = (value, char, selStart) => {
    let newChar = char;

    if (isComposing) {
      isComposingSetter(false);
      if (char.toLowerCase() in keyboard_eng_map_vow) {
        if (char.toLowerCase() !== char) {
          newChar = keyboard_eng_map_vow[char.toLowerCase()].toUpperCase();
        } else {
          newChar = keyboard_eng_map_vow[char];
        }
        newChar = (newChar + composingElement[0]).normalize("NFC");
      } else if (char in keyboard_eng_map_diacr) {
        isComposingSetter(true);
        composingElementSetter(keyboard_eng_map_diacr[char]);
        newChar = composingElement[1];
      } else if (char in keyboard_eng_map_cons) {
        newChar = composingElement[1] + keyboard_eng_map_cons[char];
      }
    } else if (char in keyboard_eng_map_diacr) {
      composingElementSetter(keyboard_eng_map_diacr[char]);
      isComposingSetter(true);
      newChar = "";
    } else if (char in keyboard_eng_map) {
      newChar = keyboard_eng_map[char];
    } else if (char.toLowerCase() in keyboard_eng_map) {
      newChar = keyboard_eng_map[char.toLowerCase()].toUpperCase();
    }
    const textBefore = value.slice(0, selStart - 1);
    const textAfter = value.slice(selStart);
    const newValue = [textBefore, newChar, textAfter].join("");

    dispatch(keyboardActions.updateInputText({newText: newValue, textIndex: 0}));

    dispatch(keyboardActions.clearShouldBeClicked());
  };

  const inputTextHandler = (event) => {
    const value = event.target.value;
    const selectionStart = event.target.selectionStart;
    selectionStartSetter(selectionStart);

    let char = event.nativeEvent.data;
    const re = new RegExp("[a-zA-Z|;:]");

    if (language === "gr" && re.exec(char) && char !== null) {
      console.log("true", char);
      inputGreekSetter(value, char, selectionStart);
    } else {
      dispatch(keyboardActions.updateInputText(value));
    }
  };

  const keyDownHandler = (event) => {
    dispatch(keyboardActions.keyClicked(event.code));
    clickedCharCodesSetter({ code: event.code, key: event.key });

    if (event.altKey && event.code === "Shift") {
      dispatch(keyboardActions.changeLanguage());
    }
    if (event.code === TAB) {
      event.preventDefault();
      const el = event.target;
      const slStart = el.selectionStart;
      const newChar = "   ";
      const textBefore = el.value.slice(0, slStart);
      const textAfter = el.value.slice(slStart);
      const newValue = [textBefore, newChar, textAfter].join("");
      dispatch(keyboardActions.updateInputText(newValue));
      selectionStartSetter(slStart + 3);
    } else if (event.key === CAPSLOCK) {
      dispatch(keyboardActions.capslockToggle());
    } else if (event.key === SHIFT) {
      dispatch(keyboardActions.shiftOn());
    }
  };

  const keyUpHandler = (event) => {
    dispatch(keyboardActions.keyReleased(event.code));

    if (event.key === SHIFT) {
      dispatch(keyboardActions.shiftOff());
      dispatch(keyboardActions.keyReleased("CapsLock"));
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
  const handlerInput = (event) => {};
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

import classes from "./TypingArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { keyboardActions } from "../../store";
import {
  keyboard_eng_map_cons,
  keyboard_eng_map_diacr,
  keyboard_eng_map_vow,
} from "../../assets/KeyboardGrMap";
import { Fragment } from "react";
import {
  SHIFT,
  CAPSLOCK,
  TAB,
} from "../../assets/Variables";

const TypingArea = (props) => {
  const ref = useRef(null);

  const [selectionStartGreek, selectionStartSetter] = useState(0);

  const [isComposing, isComposingSetter] = useState(false);

  const [composingElement, composingElementSetter] = useState(null);

  const dispatch = useDispatch();

  const language = useSelector((state) => state.language);

  const inputText = useSelector((state) => state.inputText);

  const keyboard_eng_map = {
    ...keyboard_eng_map_vow,
    ...keyboard_eng_map_cons,
  };

  useEffect(() => {
    const element = ref.current;
    element.setSelectionRange(selectionStartGreek, selectionStartGreek);
  }, [selectionStartGreek]);

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

    dispatch(keyboardActions.updateInputText({ newText: newValue }));
  };

  const inputTextHandler = (event) => {
    const value = event.target.value;

    const selectionStart = event.target.selectionStart;
    selectionStartSetter(selectionStart);

    const char = event.nativeEvent.data;

    const re = new RegExp("[a-zA-Z|;:≤≥]");

    if (language === "gr" && re.exec(char) && char !== null && char !== undefined) {
      inputGreekSetter(value, char, selectionStart);
    } else {
      dispatch(keyboardActions.updateInputText({ newText: value }));
    }
  };

  const keyDownHandler = (event) => {
    dispatch(keyboardActions.unsetError());
    dispatch(keyboardActions.keyClicked(event.code));
    if (event.altKey && event.code === "ShiftLeft") {
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


  return (
    <Fragment>
      <textarea
        id="textarea"
        wrap={"hard"}
        cols={5}
        rows={5}
        placeholder={"Zacznij pisać tutaj"}
        className={classes.text_area}
        value={inputText}
        onChange={(event) => inputTextHandler(event, event.target.value)}
        onKeyDownCapture={(event) => keyDownHandler(event)}
        onKeyUpCapture={keyUpHandler}
        onClick={(event) => inputTextHandler(event, event.target.value)}
        ref={ref}
      />
    </Fragment>
  );
};

export default TypingArea;

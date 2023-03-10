import { useSelector } from "react-redux";
import classes from "./KeyboardKey.module.css";

const KeyboardKey = (props) => {
  const shift = useSelector((state) => state.shift);
  const capslock = useSelector((state) => state.capslock);
  const clicked = useSelector((state) => state.clicked[props.id]);
  const shouldShift = useSelector((state) => state.shouldShift);
  const shouldBeClicked = useSelector(
    (state) => state.shouldBeClicked[props.id]
  );
  const language = useSelector((state) => state.language);

  let keyClasses = [classes.keyboard_key];
  if (clicked) {
    keyClasses.push(classes.active);
  }

  if (shouldBeClicked) {
    keyClasses.push(classes.awaited);
  }

  let char = props.lower;
  let latinChar = props.latin;

  if (capslock) {
    if (shift && props.latin) {
      char = char.toLowerCase();
      latinChar = latinChar.toLowerCase();
    } else if (props.latin) {
      char = props.upper;
      latinChar = latinChar.toUpperCase();
    }
  } else {
    if (shift && props.upper) {
      char = props.upper;
      if (props.latin) {
        latinChar = latinChar.toUpperCase();
      }
    }
  }

  const potentialSpecialKey = (
    <span className="material-symbols-outlined">{props.lower}</span>
  );
  let specialKey = null;
  switch (props.lower) {
    case "keyboard_backspace":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.xWide);
      break;
    case "space_bar":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.space);
      break;
    case "keyboard_capslock":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.xWide);
      keyClasses.push(classes.activation);
      if (capslock) {
        keyClasses.push(classes.activated);
      }
      break;
    case "keyboard_return":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.xWide);
      break;
    case "shift":
      specialKey = (
        <span className="material-symbols-outlined">
          keyboard_double_arrow_up
        </span>
      );
      keyClasses.push(classes.xLWide);
      if (shift) {
        keyClasses.push(classes.active);
      } else {
        keyClasses = keyClasses.filter((cls) => cls !== classes.active);
      }
      if (capslock) {
        if (!shouldShift) {
          keyClasses.push(classes.awaited);
        }
      } else {
        if (shouldShift) {
          keyClasses.push(classes.awaited);
        }
      }
      break;
    case "keyboard_tab":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.wide);
      break;

    case "\\":
      keyClasses.push(classes.wide);
      break;
  }

  let mainCharacter = char;
  let secondaryCharacter = latinChar;
  if (language === "pl" && props.latin) {
    mainCharacter = latinChar;
    secondaryCharacter = char;
  }

  return (
    <button type="button" className={keyClasses.join(" ")}>
      {specialKey ? specialKey : mainCharacter}
      {!specialKey ? (
        <span className={classes.latin}>{secondaryCharacter}</span>
      ) : null}
    </button>
  );
};

export default KeyboardKey;

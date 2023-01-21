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

  let keyClasses = [classes.KeyboardKey];
  if (clicked) {
    keyClasses.push(classes.active);
  }

  if (shouldBeClicked) {
    keyClasses.push(classes.awaited);
  }

  let char = props.lower;

  if (capslock) {
    if (shift && props.latin) {
      char = char.toLowerCase();
    } else if (props.latin) {
      char = props.upper;
    }
  } else {
    if (shift && props.upper) {
      char = props.upper;
    }
  }

  const potentialSpecialKey = (
    <span className="material-symbols-outlined">{props.lower}</span>
  );
  let specialKey = null;
  switch (props.lower) {
    case "keyboard_backspace":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.XWide);
      break;
    case "space_bar":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.Space);
      break;
    case "keyboard_capslock":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.XWide);
      keyClasses.push(classes.Activation);
      if (capslock) {
        keyClasses.push(classes.Active);
      }
      break;
    case "keyboard_return":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.XWide);
      break;
    case "shift":
      specialKey = (
        <span className="material-symbols-outlined">
          keyboard_double_arrow_up
        </span>
      );
      keyClasses.push(classes.XLWide);
      if (shift) {
        keyClasses.push(classes.active);
      } else {
        keyClasses = keyClasses.filter((cls) => cls !== classes.active);
      }
      if (capslock) {
        if (!shouldShift) {
          keyClasses.push(classes.awaited)
        }
      } else {
         if (shouldShift) {
        keyClasses.push(classes.awaited)
      }

      }
      break;
    case "keyboard_tab":
      specialKey = potentialSpecialKey;
      keyClasses.push(classes.Wide);
      break;

    case "\\":
      keyClasses.push(classes.Wide);
      break;
  }

  return (
    <button type="button" className={keyClasses.join(" ")}>
      {specialKey ? specialKey : char}
      {!specialKey ? (
        <span className={classes.Latin}>{props.latin}</span>
      ) : null}
    </button>
  );
};

export default KeyboardKey;

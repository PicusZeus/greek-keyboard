import classes from "./Keyboard.module.css";
import { keys } from "../../assets/Keys";
import KeyboardKey from "../keyboardKey/KeyboardKey";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { keyboardActions } from "../../store";
import Button from "../UI/Button/Button";
function Keyboard() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  function changeLanguageHandler() {
    dispatch(keyboardActions.changeLanguage());
  }
  const keyCaps = keys.map((line, index) => (
    <div key={index}>
      {line.map((key, index) => (
        <KeyboardKey
          key={key.id + index}
          latin={key.latin}
          lower={key.lower}
          upper={key.upper}
          id={key.id}
        />
      ))}
    </div>
  ));

  return (
    <div className={classes.keyboard}>
      <div className={classes.keyboard__keys}>
        {keyCaps}
        <div className={classes.button__language}>
          <Button onClick={changeLanguageHandler}>{language}</Button>
        </div>
      </div>
    </div>
  );
}

export default Keyboard;

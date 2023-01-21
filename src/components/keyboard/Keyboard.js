import classes from "./Keyboard.module.css";
import { keys } from "../../assets/Keys";
import KeyboardKey from "../keyboardKey/KeyboardKey";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {keyboardActions} from "../../store";
import Button from "../UI/Button/Button";
function Keyboard(props) {
    const dispatch = useDispatch()
    const language = useSelector(state => state.language)
    function changeLanguageHandler () {
        dispatch(keyboardActions.changeLanguage())
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
      <div className={classes.Keyboard}>
        <div className={classes.Keyboard__keys}>
          {keyCaps}
        </div>
          <Button onClick={changeLanguageHandler} label={language}></Button>
      </div>
  )
}

export default Keyboard;

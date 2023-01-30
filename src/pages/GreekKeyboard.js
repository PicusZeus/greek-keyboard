import Background from "../hoc/background/Background";
import Keyboard from "../components/keyboard/Keyboard";
import Button from "../components/UI/Button/Button";
import TextHolder from "../components/UI/textHolder/TextHolder";
import TypingArea from "../components/typingArea/TypingArea";
import classes from "./GreekKeyboard.module.css";
import { texts } from "../assets/TextsToType";
import { keyboardActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/UI/Modal/Modal";

const difficulties = {
  łatwy: 1,
  średni: 2,
  trudny: 3,
};

const GreekKeyboard = () => {
  const textDifficultyIndex = useSelector((state) => state.textIndex);
  const dispatch = useDispatch();
  const chooseText = (nr) => {
    dispatch(keyboardActions.changeDifficulty(nr));
  };

  const buttons = Object.keys(difficulties).map((difficulty) => {
    const clicked = difficulties[difficulty] === textDifficultyIndex;
    return (
      <Button
        key={difficulties[difficulty]}
        clicked={clicked}
        onClick={() => chooseText(difficulties[difficulty])}
      >
        {difficulty}
      </Button>
    );
  });

  return (
    <Background>
      <Modal />
      <div className={classes.mobileDisplay}>
        <div className={classes.introduction}>
          Aby poćwiczyć pisanie na klawiaturze, otwórz stronę na komputerze
        </div>

      </div>
      <div className={classes.desktopDisplay}>
        <div className={classes.introduction}>
          Wybierz poziom trudności tekstu do ćwiczenia pisania na klawiaturze.
          Klawiatura sama podpowie Ci, które klawisze należy przycisnąć.
        </div>
        <div className={classes.buttons}>{buttons}</div>
        <Keyboard />

        <TextHolder text={texts[textDifficultyIndex]} />

        <TypingArea difficulty={textDifficultyIndex} />
      </div>
    </Background>
  );
};

export default GreekKeyboard;

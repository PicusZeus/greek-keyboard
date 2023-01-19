import { useState } from "react";
import Background from "../hoc/background/Background";
import Keyboard from "../components/keyboard/Keyboard";
import Button from "../components/Button/Button";
import TextHolder from "../components/UI/textHolder/TextHolder";
import TypingArea from "../components/typingArea/TypingArea";
import { texts } from "../assets/TextsToType";
// import typingArea from "./typingArea/typingArea";
// import button from "../../../components/button/button";
// import { texts } from "../../../assets/Texts_to_type";
import classes from "./GreekKeyboard.module.css";

// import TextHolder from "../../../components/UI/TextHolder/TextHolder";

const GreekKeyboard = (props) => {
  const [textDifficulty, textDifficultySetter] = useState(0);

  const chooseText = (nr) => {
    textDifficultySetter(nr);
  };

  return (
    <Background>
      <div>
        <h2>
          Wybierz poziom trudności tekstu do ćwiczenia pisania na klawiaturze
        </h2>
        <div>
          <Button label={"łatwy"} />
          <Button label={"średni"} />
          <Button label={"trudny"} />
        </div>
        <Keyboard />
        <div>
          <TextHolder text={texts[textDifficulty]} />

          <TypingArea difficulty={textDifficulty} />
        </div>
      </div>
    </Background>
  );
};

export default GreekKeyboard;

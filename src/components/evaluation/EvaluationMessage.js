import { useEffect } from "react";
import classes from "./EvaluationMessage.module.css";
import { texts } from "../../assets/TextsToType";
import { useDispatch } from "react-redux";
import { keyboardActions } from "../../store";
import { useSelector } from "react-redux";
const EvaluationMessage = () => {
  const dispatch = useDispatch();
  const receivedText = useSelector((state) => state.inputText);
  const difficulty = useSelector((state) => state.textIndex);
  const showModal = useSelector((state) => state.showModal);

  useEffect(() => {
    if (receivedText.length >= texts[difficulty].length) {
      dispatch(keyboardActions.setShowModal(true));
    } else {
      dispatch(keyboardActions.setShowModal(false));
    }
  }, [receivedText, difficulty, dispatch]);

  const evaluateText = (receivedText) => {
    if (receivedText) {
      const originalTextArray = Array.from(texts[difficulty]);
      const receivedTextArray = Array.from(receivedText);
      let numberOfErrors = 0;
      const evaluatedText = [];

      receivedTextArray.forEach((char, index) => {
        if (char === originalTextArray[index]) {
          evaluatedText.push(<span>{char}</span>);
        } else {
          numberOfErrors++;
          evaluatedText.push(<span className={classes.error}>{char}</span>);
        }
      });
      return [evaluatedText, numberOfErrors];
    } else {
      return ["", 0];
    }
  };

  const giveResult = (numberOfErrors) => {
    let errors;
    const numOfErString = numberOfErrors.toString();
    if (numberOfErrors === 1) {
      errors = "błąd";
    } else if (
      ["2", "3", "4"].includes(numOfErString[numOfErString.length - 1]) &&
      numOfErString[numOfErString.length - 2] !== "1"
    ) {
      errors = "błędy";
    } else {
      errors = "błędów";
    }
    return "Popełniłeś(aś) " + numOfErString + " " + errors;
  };
  let numberOfErrors = 0;
  let evaluatedText = "Pedicabo vos et irrumabo";
  let yourResult = "Gallia est omnis divisa in partes tres";

  if (showModal) {
    [evaluatedText, numberOfErrors] = evaluateText(receivedText);
    yourResult = giveResult(numberOfErrors);
  }

  return (
    <div className={classes.evaluated_text}>
      {evaluatedText}
      <h1 className={classes.message}>{yourResult}</h1>
    </div>
  );
};
export default EvaluationMessage;

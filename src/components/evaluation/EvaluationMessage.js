import { useEffect, useState, useRef } from "react";
import classes from "./EvaluationMessage.module.css"
import { texts } from "../../assets/TextsToType";
import Modal from "../UI/Modal/Modal";
import {useDispatch} from "react-redux";
import {keyboardActions} from "../../store";

const EvaluatedText = (props) => {
  const [showModal, showModalSet] = useState(false);
  const dispatch = useDispatch()
  console.log(props.value, "valeue")
  const receivedText = props.value?Array.from(props.value):'';
  const originalText = Array.from(texts[props.difficulty]);
  const refButton = useRef()
  useEffect(() => {
    console.log(refButton)
    refButton.current?.focus()
  }, [showModal])
  useEffect(() => {
    if (receivedText.length >= originalText.length) {

      showModalSet(true);
    }
  }, [originalText, receivedText]);

  let numberOfErrors = 0;
  const backgroundErrors = { background: "LawnGreen" };
  let inflectedBledy = "błędów";

  const closeModal = () => {
    showModalSet(false);
    props.resetText();
  };

  let message_1 = "Gratuluję, twój wynik to ";
  let evaluatedText = "";
  if (receivedText) {
      evaluatedText = receivedText.map((el, index) => {
    if (el === originalText[index]) {
      return <span>{el}</span>;
    } else {
      numberOfErrors += 1;
      if (numberOfErrors === 1) {
        inflectedBledy = "błąd";
      } else if (numberOfErrors > 1 && numberOfErrors < 5) {
        inflectedBledy = "błędy";
      } else if (numberOfErrors > 4) {
        inflectedBledy = "błędów";
      }
      if (numberOfErrors > 3) {
        backgroundErrors.background = "OrangeRed";
        message_1 = "Warto spróbować jeszcze raz, twój wynik to ";
      }
      return <span className={classes.Error}>{el}</span>;
    }
  });
  }




  let message = message_1 + numberOfErrors.toString() + " " + inflectedBledy;

  return (
    <div ref={refButton} className={classes.Main}>
      <Modal  show={showModal} modalClosed={() => closeModal()}>
        {message}
      </Modal>
      <div className={classes.EvaluatedText}>{evaluatedText}</div>
      <div className={classes.NumberOfErrors} style={backgroundErrors}>
        {numberOfErrors}
      </div>
    </div>
  );
};
export default EvaluatedText;

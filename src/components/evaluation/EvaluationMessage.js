import {useState, useRef, useEffect} from "react";
import classes from "./EvaluationMessage.module.css";
import { texts } from "../../assets/TextsToType";
import Modal from "../UI/Modal/Modal";
import {useDispatch} from "react-redux";
import {keyboardActions} from "../../store";
import {useSelector} from "react-redux";
const EvaluatedText = () => {
 //  const dispatch = useDispatch()
 //  const receivedText = useSelector(state => state.inputText)
 //  const difficulty = useSelector(state => state.textIndex)
 //
 //  const [showModal, showModalSet] = useState(false);
 //
 //  const originalTextArray = Array.from(texts[difficulty]);
 //  const receivedTextArray = Array.from(receivedText)
 //
 //
 //    let numberOfErrors = 0;
 //  const backgroundErrors = { background: "LawnGreen" };
 //
 //
 //  useEffect(()=>{
 //    if ()
 //  }, [receivedText, difficulty])
 // //  let inflectedBledy = "błędów";
 // //
 // //  // const closeModal = () => {
 // //  //   dispatch(keyboardActions.clearClicked())
 // //  //   showModalSet(false);
 // //  //   dispatch(keyboardActions.updateInputText(''));
 // //  // };
 // //
 // //  let message_1 = "Gratuluję, twój wynik to ";
 //  let evaluatedText = "";
 // //  if (receivedText) {
 // //    evaluatedText = receivedTextArray.map((el, index) => {
 // //      if (el === originalTextArray[index]) {
 // //        return <span>{el}</span>;
 // //      } else {
 // //
 // //        numberOfErrors += 1;
 // //
 // //        return <span className={classes.Error}>{el}</span>;
 // //      }
 // //    });
 // //  }
 // // //  useEffect(()=> {
 // // // if (receivedText && receivedText[receivedText.length-1] !== originalText[receivedText.length - 1]) {
 // // //    dispatch(keyboardActions.setError())
 // // //  }
 // // //  },[receivedText])
 // //
 // //  let message = message_1 + numberOfErrors.toString() + " " + inflectedBledy;
 // //
 //  let modal = null;
 //  if (showModal) {
 //
 //    modal = (
 //      <Modal show={showModal} >
 //        {message}
 //      </Modal>
 //    );
 //  }
 //    if (numberOfErrors === 1) {
 //          inflectedBledy = "błąd";
 //        } else if (numberOfErrors > 1 && numberOfErrors < 5) {
 //          inflectedBledy = "błędy";
 //        } else if (numberOfErrors > 4) {
 //          inflectedBledy = "błędów";
 //        }
 //        if (numberOfErrors > 3) {
 //          backgroundErrors.background = "OrangeRed";
 //          message_1 = "Warto spróbować jeszcze raz, twój wynik to ";
 //        }
  return (
    <div className={classes.Main}>
      {/*{modal}*/}
      {/*<div className={classes.EvaluatedText}>{evaluatedText}</div>*/}
      {/*<div className={classes.NumberOfErrors} style={backgroundErrors}>*/}
      {/*  {numberOfErrors}*/}
      {/*</div>*/}
    </div>
  );
};
export default EvaluatedText;

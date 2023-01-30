import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { keyboardActions } from "../../../store";
import { useSelector } from "react-redux";
import EvaluationMessage from "../../evaluation/EvaluationMessage";
import { useDispatch } from "react-redux";
const Modal = (props) => {
  const showModal = useSelector((state) => state.showModal);
  const dispatch = useDispatch();
  const modalClosed = () => {
    dispatch(keyboardActions.setShowModal(false));
    dispatch(keyboardActions.updateInputText(""));
  };

  return (
    <React.Fragment>
      <Backdrop show={showModal} clicked={modalClosed} />
      <div
        className={classes.main_modal}
        style={{
          transform: showModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showModal ? "1" : "0",
        }}
      >
        {props.children}
        <button autoFocus className={classes.button} onClick={modalClosed}>
          OK
        </button>
        <EvaluationMessage />
      </div>
    </React.Fragment>
  );
};

export default Modal;



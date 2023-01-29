import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";
import EvaluatedText from "../../evaluation/EvaluationMessage";
import {keyboardActions} from "../../../store";


const modal = (props) => {

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
        <button autoFocus onClick={props.modalClosed}>
          OK
        </button>
        <EvaluatedText


        />
      </div>
    </React.Fragment>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
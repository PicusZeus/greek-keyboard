import classes from "./Backdrop.module.css";

const backdrop = (props) =>
  props.show ? (
    <div className={classes.backdrop} onClick={props.clicked} />
  ) : null;

export default backdrop;

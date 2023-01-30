import classes from "./Button.module.css";

const button = (props) => {
  let buttonClasses = [classes.button];
  if (props.clicked) {
    buttonClasses.push(classes.button_clicked);
  }
  return (
    <button onClick={props.onClick} className={buttonClasses.join(" ")}>
      {props.children}
    </button>
  );
};

export default button;

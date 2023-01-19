import classes from './Button.module.css'

const button = props => {

    return (
        <button onClick={props.onClick} className={classes.Button}>{props.label}</button>
    )
}

export default button
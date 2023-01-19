import classes from './TextHolder.module.css'



function TextHolder(props) {
    return (
        <div className={classes.main}>{props.text}</div>
    )
}

export default TextHolder
import classes from './TextHolder.module.css'
import {useSelector} from "react-redux";


function TextHolder(props) {
    const error = useSelector((state) => state.error)
    const classT = [classes.text_holder]

    if (error) {
        classT.push(classes.error)
    }
    return (




        <div className={classT.join(' ')}>{props.text}</div>
    )
}

export default TextHolder
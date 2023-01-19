
import classes from './Background.module.css'
const Background = props => {
    return (
        <main className={classes.background}>
            {props.children}
        </main>
    )
}

export default Background
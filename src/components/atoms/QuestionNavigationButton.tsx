
import styles from './QuestionNavigationButton.module.css';


export default function QuestionNavigationButton( props : { index: number, currentIndex: number } ) {

    const { index, currentIndex } = props;

    const onclick = ( event: React.MouseEvent<HTMLButtonElement>, index: number ) => {
        event.preventDefault();
        console.log("Question Navigation Button clicked", index);
    }

    return(<>
        <button 
            onClick={ (e) => onclick(e, index) } 
            className={`${styles.button} ${index === currentIndex ? styles.active : ''}`}
        ></button>
    </>);
}
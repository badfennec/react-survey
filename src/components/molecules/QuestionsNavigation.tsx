import QuestionNavigationButton from '../atoms/QuestionNavigationButton';

export default function QuestionsNavigations(props: {questions: Array<object>, currentIndex: number}) {

    const { questions, currentIndex } = props;

    return (<>
        <div>
            {questions.map((question, index) => (
                <QuestionNavigationButton key={index} index={index} currentIndex={currentIndex} />
            ))}
        </div>
    </>);
}
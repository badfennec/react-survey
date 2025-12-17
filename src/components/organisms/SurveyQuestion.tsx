import type { Question } from '../../services/questions.service.ts';
import { useAppDispatch } from "../../hooks/store.hook.ts";
import { processAnswer } from '../../store/slices/survey';

import SurveyQuestionOptions from './SurveyQuestionOptions.tsx';

import styles from './SurveyQuestion.module.css';

export default function SurveyQuestion({ question }: { question: Question }) {

    const dispatch = useAppDispatch();

    const onOptionChange = ( value: string | number | Array<string | number> ) => {
        dispatch( processAnswer({ questionId: question.id, userAnswer: value }) );
    }

    return (
        <div>
            <div className={styles.title}>{question.text}</div>

            <ul>
                <SurveyQuestionOptions question_id={question.id} options={question.options} type={question.type} onOptionChange={onOptionChange} />
            </ul>

        </div>
    )
}
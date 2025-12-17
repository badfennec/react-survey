import type { Question } from '../../services/questions.service.ts';

import SurveyQuestionOptions from './SurveyQuestionOptions.tsx';

import styles from './SurveyQuestion.module.css';

export default function SurveyQuestion({ question }: { question: Question }) {
    return (
        <div>
            <div className={styles.title}>{question.text}</div>

            <ul>
                <SurveyQuestionOptions question_id={question.id} options={question.options} type={question.type} />
            </ul>

        </div>
    )
}
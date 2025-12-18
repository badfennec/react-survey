import type { SurveyAnswer } from "../../store/slices/survey/index.ts";
import type {Question, QuestionType} from '../../services/questions.service'

export default function FinishReportListItem({ answer }: { answer: SurveyAnswer }) {

    const question : Question = answer.question;
    const questionType : QuestionType = question.type; 
    const options = question.options;
    const answerValues = [];

    if( questionType === 'SINGLE_CHOICE') {
        const valueText = options.find( option => option.value == answer.answer );
        answerValues.push( valueText ? valueText.label : '-' );
    } else {
        if( Array.isArray( answer.answer ) ){
            answer.answer.forEach( ans => {
                const valueText = options.find( option => option.value == ans );
                answerValues.push( valueText ? valueText.label : '-' );
            } );
        }
    }

    return (<>
        <div className={'font-semibold mb-1'}>{ question.text }</div>
        
        <ul className={'grid grid-cols-1 gap-1 list-disc pl-4'}>
            {
                answerValues.map( ( value, index ) => (
                    <li key={index} className={'ml-4'}>{ value }</li>
                ) )
            }
        </ul>
        
    </>)

}
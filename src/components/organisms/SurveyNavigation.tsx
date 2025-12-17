import { useAppSelector, useAppDispatch } from "../../hooks/store.hook.ts";

import { saveAnswer, changeAnswerPointer, goToNextStep } from '../../store/slices/survey';

import ButtonSolid from '../atoms/ButtonSolid';

export default function SurveyNavigation() {

    const dispatch = useAppDispatch();

    const answersPointer = useAppSelector((state) => state.survey.answersPointer);
    const answers = useAppSelector((state) => state.survey.answers);
    const currentAnswer = answers[answersPointer];
    const isFinalQuestion = currentAnswer?.next_questionId === "END_REPORT";

    const handlePrevClick = ( mode: 'prev' | 'next') => {

        if( !currentAnswer ) return;

        if( mode === 'next' ){

            if( isFinalQuestion ){
                dispatch( goToNextStep() );
                return;
            }

            dispatch(saveAnswer());
        }

        dispatch(changeAnswerPointer( mode === 'prev' ? currentAnswer.prev_questionId ?? false : currentAnswer.next_questionId ?? false ) );
    }

    return (<>
        <div className={ 'flex justify-between w-full' }>
            <ButtonSolid
                disabled={ !currentAnswer.prev_questionId }
                onClick={ () => handlePrevClick('prev')}
            >
                Prev
            </ButtonSolid>

            <ButtonSolid
                disabled={ !currentAnswer.next_questionId || currentAnswer.answer === null || ( Array.isArray( currentAnswer.answer ) && currentAnswer.answer.length === 0 ) }
                onClick={ () => handlePrevClick('next') }
            >
                {isFinalQuestion ? "Finish" : "Next"}
            </ButtonSolid>
        </div>
    </>);
}
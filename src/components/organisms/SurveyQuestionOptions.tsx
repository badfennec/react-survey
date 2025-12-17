import { useAppSelector } from "../../hooks/store.hook.ts";
import type { QuestionOption, QuestionType } from '../../services/questions.service';
import { useState, useEffect } from 'react';

import RadioInput from '../molecules/RadioInput';
import CheckboxInput from '../molecules/CheckboxInput';

interface Props {
    question_id: string;
    options: QuestionOption[];
    type: QuestionType;
    onOptionChange?: ( value: string | number | Array<string | number> ) => void;
}

export default function SurveyQuestionOptions({ question_id, options, type, onOptionChange }: Props) {

    const answersPointer = useAppSelector((state) => state.survey.answersPointer);
    const answers = useAppSelector((state) => state.survey.answers);
    const currentAnswer = answers[answersPointer];

    const inputName = `survey-option-${question_id}`;
    const [value, setValue] = useState< null | Array<any> | number | string >( currentAnswer.answer ?? null );  

    const onCahnge = ( val: string | number ) => {
        if( type === 'SINGLE_CHOICE' ){
            setValue( val );
        } else {
            const values = value ? [...value as Array<string | number>] : [];
            const index = values.indexOf( val );

            if( index > -1 ){
                values.splice( index, 1 );
            } else {
                values.push( val );
            }

            setValue( values );
        }
    }

    useEffect( () => {
        if( value && onOptionChange ){
            onOptionChange( value );
        }
    }, [value] );

    return (
        <ul className={'grid grid-cols-1 gap-2'}>
            { options.map( option => {
                return (<li key={option.value}>
                    { type === 'SINGLE_CHOICE' ? (
                        <RadioInput 
                            name={inputName}
                            value={String(option.value)} 
                            label={option.label}
                            onChange={ ( val ) => { onCahnge(val); } }
                            checked={ value == option.value }
                        />
                    ) : (
                        <CheckboxInput 
                            name={inputName}
                            value={String(option.value)} 
                            label={option.label}
                            onChange={ ( val ) => { onCahnge(val); } }
                            checked={ Array.isArray(value) && value.includes(option.value) }
                        />
                    ) }
                </li>);
            }) }
        </ul>
    )
}
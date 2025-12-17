import { useState } from 'react';

import styles from './TextInput.module.css';
import errorStyles from '../../assets/css/errors.module.css';

interface Props {
    onInput?: ( value: string ) => void;
    value?: string;
    placeholder?: string;
    label?: string;
    errors?: Array<string>;
    showErrorsOnBlur?: boolean;
}

export default function TextInput( props : Props ) {

    const [isOnFocus, setIsOnFocus ] = useState(false);
    const [hasBlurred, setHasBlurred ] = useState(false);
    const [showErrorsOnBlur, setShowErrorsOnBlur ] = useState( props.showErrorsOnBlur ?? true );
    
    const onInput = ( event: React.FormEvent<HTMLInputElement> ) => {
        if( props.onInput ){
            props.onInput( event.currentTarget.value );
        }
    };

    const onFocus = ( event: React.FocusEvent<HTMLInputElement> ) => {
        setIsOnFocus(true);
    }

    const onBlur = ( event: React.FocusEvent<HTMLInputElement> ) => {
        setHasBlurred(true);
        setIsOnFocus(false);
    }

    const showErrors = () : boolean => {
        if( !props.errors || props.errors.length === 0 ){
            return false;
        }

        return showErrorsOnBlur && hasBlurred || !showErrorsOnBlur && isOnFocus;
    }

    return (<>
        <div className={`${ isOnFocus ? styles.focus : '' } ${ showErrors() ? styles['is-error'] : '' }`}>

            <label className={styles.label}>

                { props.label &&
                    <span className={styles.text}>{ props.label }</span>
                }

                <input
                    type="text"
                    onInput={ onInput }
                    value={props.value}
                    placeholder={props.placeholder} 
                    onFocus={onFocus}
                    onBlur={onBlur}
                />

                { props.errors && showErrors() &&
                    <ul className={errorStyles.list}>
                        { props.errors.map( ( error, index ) => (       
                            <li key={index}>
                                { error }
                            </li>                        
                        ) ) }
                    </ul>
                }

            </label>
        </div>
    </>);
}
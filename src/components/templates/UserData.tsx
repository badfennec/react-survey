import { useState, useEffect } from 'react';
import { validateName, validateEmailAddress } from '../../utils/validate-input';

import { goToNextStep, saveUserData } from '../../store/slices/survey';
import { useAppDispatch } from '../../hooks/store.hook';

import Step from '../organisms/Step';

import TextInput from '../molecules/TextInput';
import ButtonSolid from '../atoms/ButtonSolid';

export default function UserData(){

    const dispatch = useAppDispatch();

    const [ canStepForward, setCanStepForward ] = useState(false);
    const [ inputTimer, setInputTimer ] = useState<ReturnType<typeof setTimeout> | null>(null);

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    const [isValidName, setIsValidName ] = useState<boolean | null>( null );
    const [isValidEmail, setIsValidEmail ] = useState<boolean | null>( null );

    const onInputTimer = ( callback: () => void ) => {
        if( inputTimer ){
            clearTimeout( inputTimer );
        }

        setInputTimer( setTimeout( () => {
            callback();
        }, 300) );
    }

    const onInputName = ( value: string ) => {
        onInputTimer( () => {
            setUserName( value );
            setIsValidName( validateName(value) );
        } );
    }

    const onInputEmail = ( value: string ) => {
        onInputTimer( () => {
            setUserEmail( value );
            setIsValidEmail( validateEmailAddress(value) );
        } );
    }

    const checkCanStepForward = () : void => {
        setCanStepForward( Boolean(isValidName) && Boolean(isValidEmail) );
    }

    const getNameErrors = () : Array<string> => {
        const errors : Array<string> =  [];

        if( isValidName === false ){
            errors.push( "Please enter a valid name (at least 2 characters, letters, spaces, apostrophes, and hyphens only)." );
        }

        return errors;
    }

    const getEmailErrors = () : Array<string> => {
        const errors : Array<string> =  []; 

        if( isValidEmail === false ){
            errors.push( "Please enter a valid email address." );
        }    
        return errors;
    }

    const onClickStart = ( event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(saveUserData({ name: userName, email: userEmail }));
        dispatch(goToNextStep());
    }

    useEffect( () => {
        checkCanStepForward();
    }, [ isValidName, isValidEmail ] );

    return(<>
        <Step>
            <Step.Title>
                Your Data
            </Step.Title>

            <Step.Description>
                Please provide your personal information to proceed with the quiz.
            </Step.Description>

            <div className={"grid grid-cols-1 gap-4 mt-6"}>
                
                <div>
                    <TextInput 
                        onInput={onInputName}
                        placeholder="Your name"
                        label="Name"
                        errors={getNameErrors()}
                    />
                </div>

                <div>
                    <TextInput 
                        onInput={onInputEmail}
                        placeholder="Your email"
                        label="Email"
                        errors={getEmailErrors()}
                    />
                </div>

            </div>
            
            <Step.Footer>
                <div className="text-center">
                    <ButtonSolid
                        disabled={!canStepForward}
                        onClick={onClickStart}
                    >
                        Start Survey
                    </ButtonSolid>
                </div>
            </Step.Footer>
        </Step>
    </>);
}
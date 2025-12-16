import React from 'react';

import { goToNextStep } from '../../store/slices/survey';
import { useAppDispatch } from '../../hooks/store.hook';

import Step from '../organisms/Step';
import ButtonSolid from '../atoms/ButtonSolid';


export default function Intro(){

    const dispatch = useAppDispatch();

    const onClickStart = ( event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        statTheQuiz();
    }

    const statTheQuiz = () => {        
        dispatch(goToNextStep());
    };   

    return(<>
        <Step>
            <Step.Title>
                Welcome to the Survey!
            </Step.Title>

            <Step.Description>
                This quiz will test your knowledge on various topics. <br></br>
                Get ready to challenge yourself and have fun!
            </Step.Description>
            
            <Step.Footer>
                <div className="text-center">
                    <ButtonSolid
                        onClick={onClickStart}
                    >
                        Start Now
                    </ButtonSolid>
                </div>
            </Step.Footer>
        </Step>
    </>);
}
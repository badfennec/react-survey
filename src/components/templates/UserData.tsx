import { useState } from 'react';

import Step from '../organisms/Step';
import ButtonSolid from '../atoms/ButtonSolid';

export default function UserData(){

    const [ canStepForward, setCanStepForward ] = useState(false);

    return(<>
        <Step>
            <Step.Title>
                Your Data
            </Step.Title>

            <Step.Description>
                Please provide your personal information to proceed with the quiz.
            </Step.Description>
            
            <Step.Footer>
                <div className="text-center">
                    <ButtonSolid
                        disabled={!canStepForward}
                    >
                        Start Now
                    </ButtonSolid>
                </div>
            </Step.Footer>
        </Step>
    </>);
}
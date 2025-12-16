import { useSelector } from 'react-redux'

import Loading from "../organisms/Loading";
import QuestionNavigationButton from '../atoms/QuestionNavigationButton';

export default function Survey(){    

    const questions = useSelector((state: any) => state.survey.questions);
    const isLoading = questions.length === 0;

    return (
        <>
            { isLoading ? <><Loading /></> : <>
            
                <div>
                    <QuestionNavigationButton index={0} currentIndex={10} />
                </div>

            </> }
        </>
    )
};
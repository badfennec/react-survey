import { useSelector } from 'react-redux'

import Loading from "../organisms/Loading";

export default function Survey(){    

    const questions = useSelector((state: any) => state.survey.questions);
    const isLoading = questions.length === 0;

    return (
        <>
            { isLoading ? <><Loading /></> : <>
            
                <div>My Quiz here</div>

            </> }
        </>
    )
};
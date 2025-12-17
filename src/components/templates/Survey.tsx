import { useAppSelector, useAppDispatch } from "../../hooks/store.hook.ts";

import Step from '../organisms/Step';
import Loading from "../organisms/Loading";
import SurveyQuestion from "../organisms/SurveyQuestion";
import QuestionNavigationButton from '../atoms/QuestionNavigationButton';

export default function Survey(){    

    const questions = useAppSelector((state) => state.survey.questions);
    const answers = useAppSelector((state) => state.survey.answers);

    const user = useAppSelector((state) => state.survey.user);
    const isLoading = questions.length === 0;

    return (
        <>
            { isLoading ? <><Loading /></> : <>

                <Step>
                    <Step.Title>
                        <span className={'text-purple-500'}>{ user.name }</span>, let's begin the survey!
                    </Step.Title>

                    <div>
                        {
                            answers.map((answer, index) => {
                                const question = questions.find(q => q.id === answer.questionId);
                                if (!question) return null;

                                return (
                                    <SurveyQuestion key={question.id} question={question} />
                                );
                            })
                        }
                    </div>
                </Step>

            </> }
        </>
    )
};
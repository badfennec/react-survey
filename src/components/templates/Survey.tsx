import { useAppSelector } from "../../hooks/store.hook.ts";

import Step from '../organisms/Step';
import Loading from "../organisms/Loading";

import SurveyQuestion from "../organisms/SurveyQuestion";
import SurveyNavigation from "../organisms/SurveyNavigation";

export default function Survey(){    

    const questions = useAppSelector((state) => state.survey.questions);
    const answers = useAppSelector((state) => state.survey.answers);
    const answersPointer = useAppSelector((state) => state.survey.answersPointer);

    const user = useAppSelector((state) => state.survey.user);
    const isLoading = questions.length === 0;

    return (
        <>
            { isLoading ? <><Loading /></> : <>

                <Step>

                    <Step.Title>
                        Hello <span className={'text-purple-500'}>{ user.name }</span>!
                    </Step.Title>

                    <div>
                        {
                            answers.map((answer, index) => {
                                const question = questions.find(q => q.id === answer.questionId);
                                if (!question || index !== answersPointer) return null;

                                return (
                                    <SurveyQuestion key={question.id} question={question} />
                                );
                            })
                        }
                    </div>

                    <Step.Footer>
                        <SurveyNavigation />
                    </Step.Footer>
                </Step>

            </> }
        </>
    )
};
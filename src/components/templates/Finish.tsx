import { useAppSelector } from "../../hooks/store.hook.ts";
import Step from '../organisms/Step';
import FinishReportListItem from "../organisms/FinishReportListItem";

export default function Finish(){

    const user = useAppSelector((state) => state.survey.user);
    const answers = useAppSelector((state) => state.survey.answers);

    return(<>
        <Step>

            <Step.Title>
                <span className={'text-purple-500'}>{ user.name }</span>, you are all done!
            </Step.Title>

            <Step.Description>
                Thank you for completing the survey.
            </Step.Description>

            <div className={'mt-4'}>
                <ul className={'grid grid-cols-1 gap-4 text-sm'}>
                    { answers.map( ( answer, index ) => (
                        <li key={index}>
                            <FinishReportListItem answer={ answer } />
                        </li>
                    ) ) }
                </ul>
            </div>

        </Step>
    </>);
}
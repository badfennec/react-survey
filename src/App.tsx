import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/store.hook.ts";

import getQuestions from "./services/questions.service";
import type { Question } from "./services/questions.service.ts";
import { initQuestions } from "./store/slices/survey";

import Intro from "./components/templates/Intro.tsx";
import Survey from './components/templates/Survey.tsx';
import Finish from './components/templates/Finish.tsx';

function App() {
		
	const dispatch = useAppDispatch();
	const currentStep = useAppSelector((state) => state.survey.step);

	useEffect(() => {   
  
		const controller = new AbortController();

		const loadQuestions = async () => {
			try {
				const data = await getQuestions(controller.signal);
				dispatch(initQuestions(data as Array<Question>));
			}  catch (error) {
				console.error("Error fetching questions:", error);
			} 
		}

		loadQuestions();

		return () => {
			controller.abort();
		}
	}, []);

  return (
    <>
		{ currentStep === 'INTRO' && <>
			<Intro />
		</>}
		{ currentStep === 'SURVEY' && <>
			<Survey />
		</>}
		{ currentStep === 'FINISH' && <>
			<Finish />
		</>}
    </>
  )
}

export default App

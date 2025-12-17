import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'

import type {Question, QuestionType} from '../../../services/questions.service'

export type SurveyStep = 'INTRO' | 'USERDATA' | 'SURVEY' | 'FINISH';

interface SurveyUser {
    name: string;
    email: string;
}

interface SurveyAnswer {
    questionId: string;
    answer: null |string | number | Array<string | number>;
    prev_questionId?: string | boolean;
    next_questionId?: string | boolean;
}

interface SurveyState {
    user: SurveyUser;
    questions: Array<Question>;
    answers: Array<SurveyAnswer>;
    answersPointer: number;
    /* nextQuestionId: boolean | string;
    prevQuestionId: boolean | string; */
    currentQuestionId: string | null;
    completed: boolean;
    step: SurveyStep;
    stepOrder: Array<SurveyStep>;
}

const initialState: SurveyState = {
    user: {
        name: '',
        email: ''
    },
    questions: [],
    answers: [],
    answersPointer: 0,
    /* nextQuestionId: false,
    prevQuestionId: false, */
    currentQuestionId: null,
    completed: false,
    step: 'INTRO',
    stepOrder: ['INTRO', 'USERDATA', 'SURVEY', 'FINISH']
}

export const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
        initQuestions: (state: SurveyState, action: PayloadAction<Array<Question>>) : void => {
            state.questions = [...action.payload];

            state.answers = action.payload.map((question, index) => ({
                questionId: question.id,
                answer: null,
                prev_questionId: index === 0 ? false : action.payload[index - 1].id,
                next_questionId: false
            }));
        },
        goToNextStep: (state: SurveyState) : void => {
            const currentStepIndex = state.stepOrder.indexOf(state.step);
            if (currentStepIndex < state.stepOrder.length - 1) {
                state.step = state.stepOrder[currentStepIndex + 1];
            }
        },
        saveUserData: (state: SurveyState, action: PayloadAction<SurveyUser>) : void => {
            state.user = { ...action.payload };
        },
        processAnswer: (state: SurveyState, action: PayloadAction<{ questionId: string; userAnswer: null | string | number | Array<string | number> }>) : void => {

            const userAnswer = action.payload.userAnswer;
        
            // Find the question to ensure it exists
            const question = state.questions.find(q => q.id === action.payload.questionId);

            // If the question exists, update the corresponding answer
            if (!question) {
                console.warn(`Question with ID ${action.payload.questionId} not found.`);
                return;
            }

            //answer is valid, update answer
            const questionType : QuestionType = question.type;
            state.answers[state.answersPointer].answer = userAnswer;
            state.answers[state.answersPointer].prev_questionId = state.answersPointer > 0 ? state.answers[state.answersPointer - 1].questionId : false;

            let nextQuestionId: string | false = question.next_q_id || false;

            if( !nextQuestionId && questionType === 'SINGLE_CHOICE' ){
                const questionOption = question.options.find( option => option.value == userAnswer );

                if( questionOption && questionOption.next_q_id ){
                    nextQuestionId = questionOption.next_q_id;
                }
            }

            if( nextQuestionId ){
                state.answers[state.answersPointer].next_questionId = nextQuestionId;
            }
        },
        saveAnswer: (state: SurveyState) : void => {
            const currentAnswer = state.answers[state.answersPointer];
            const nextAnswer = state.answers[state.answersPointer + 1];
            let nextAnswerToPushId : string | false = false;

            if( nextAnswer ){
                //there is already a next answer
                //check if next_questionId matches

                if( nextAnswer.questionId !== currentAnswer.next_questionId ){
                    //next question has changed, need to update the chain
                    state.answers = state.answers.slice( 0, state.answersPointer + 1 );
                    nextAnswerToPushId = currentAnswer.next_questionId as string;
                }
            } else {
                nextAnswerToPushId = currentAnswer.next_questionId as string;
            }

            if( nextAnswerToPushId ){

                //check if question exists
                const questionToPush = state.questions.find( q => q.id === nextAnswerToPushId );

                if( questionToPush ){
                    state.answers.push({
                        questionId: nextAnswerToPushId,
                        answer: null,
                        prev_questionId: currentAnswer.questionId,
                        next_questionId: false
                    });
                }                
            }
        },
        changeAnswerPointer: (state: SurveyState, action: PayloadAction<string | boolean>) : void => {

            if( action.payload === false ){
                //this can beh the end of the survey
            }

            state.answers.map( ( answer, index ) => {
                console.log( index, answer.questionId );
            } );

            const nextAnswer = state.answers.findIndex( answer => answer.questionId === action.payload );

            if( nextAnswer > -1 ){
                state.answersPointer = nextAnswer;
            }
        }
    }
});

export const { initQuestions, goToNextStep, saveUserData, processAnswer, saveAnswer,changeAnswerPointer } = surveySlice.actions;
export const selectSurvey = (state: RootState) => state.survey;

export default surveySlice.reducer;
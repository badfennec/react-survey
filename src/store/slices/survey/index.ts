import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../index'

import type {Question} from '../../../services/questions.service'

export type SurveyStep = 'INTRO' | 'USERDATA' | 'SURVEY' | 'FINISH';

interface SurveyUser {
    name: string;
    email: string;
}

interface SurveyAnswer {
    questionId: string;
    answer: string | number | Array<string | number>;
}

interface SurveyState {
    user: SurveyUser;
    questions: Array<Question>;
    answers: Array<SurveyAnswer>;
    answersPointer: number;
    nextQuestion: boolean | string;
    prevQuestion: boolean | string;
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
    nextQuestion: false,
    prevQuestion: false,
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
        },
        goToNextStep: (state: SurveyState) : void => {
            const currentStepIndex = state.stepOrder.indexOf(state.step);
            if (currentStepIndex < state.stepOrder.length - 1) {
                state.step = state.stepOrder[currentStepIndex + 1];
            }
        },
        saveUserData: (state: SurveyState, action: PayloadAction<SurveyUser>) : void => {
            state.user = { ...action.payload };
        }
    }
});

export const { initQuestions, goToNextStep, saveUserData } = surveySlice.actions;
export const selectSurvey = (state: RootState) => state.survey;

export default surveySlice.reducer;
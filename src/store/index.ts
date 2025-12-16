import { configureStore } from '@reduxjs/toolkit'
import surveySliceReducer from './slices/survey'

export const store = configureStore({
    reducer: {
        survey: surveySliceReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export interface QuestionOption {
    value: string | number;
    label: string;
    next_q_id?: string;
}

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options: QuestionOption[];
    next_q_id?: string;
}

export default async function getQuestions(signal: AbortSignal) {

    if (signal?.aborted) {
        throw new Error("Fetch aborted before starting");
    }

    //simulate fetching questions from a local JSON file
    try {
        const response = await fetch('/questions.json', { signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
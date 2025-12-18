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

    const pathToQuestions = '/questions.json';

    if (signal?.aborted) {
        throw new Error("Fetch aborted before starting");
    }

    //now we use a local JSON file to simulate fetching from an API
    //you can also import the JSON file directly if preferred
    try {
        const response = await fetch(pathToQuestions, { signal });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
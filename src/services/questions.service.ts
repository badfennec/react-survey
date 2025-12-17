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

const MOCK_QUESTIONS: Question[] = [
    {
        "id": "Q1",
        "text": "What is your primary role in your work/study context?",
        "type": "SINGLE_CHOICE",
        "options": [
            {
                "value": "MANAGER_OWNER",
                "label": "Manager / Business Owner",
                "next_q_id": "Q2"
            },
            {
                "value": "EMPLOYEE",
                "label": "Employee / Staff Member",
                "next_q_id": "Q2"
            },
            {
                "value": "FREELANCE_STUDENT",
                "label": "Freelancer / Student",
                "next_q_id": "Q3"
            }
        ]
    },
    {
        "id": "Q2",
        "text": "(For Managers/Employees) Do you work primarily in a remote environment or in an office?",
        "type": "SINGLE_CHOICE",
        "options": [
            {
                "value": "OFFICE_HYBRID",
                "label": "Office / Hybrid (mostly on-site)",
                "next_q_id": "Q4"
            },
            {
                "value": "REMOTE",
                "label": "Fully remote",
                "next_q_id": "Q4"
            }
        ]
    },
    {
        "id": "Q3",
        "text": "(For Freelancers/Students) How important is time management in your daily workflow?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": 1, "label": "Not very important" },
            { "value": 2, "label": "Somewhat important" },
            { "value": 3, "label": "Important" },
            { "value": 4, "label": "Very important" },
            { "value": 5, "label": "Essential" }
        ],
        "next_q_id": "Q5"
    },
    {
        "id": "Q4",
        "text": "Do you use specific Time Tracking tools to monitor your productivity?",
        "type": "SINGLE_CHOICE",
        "options": [
            {
                "value": "SOFTWARE_DEDICATED",
                "label": "Yes, I use dedicated software (e.g., Toggl, Clockify)",
                "next_q_id": "Q6"
            },
            {
                "value": "BASIC_TOOLS",
                "label": "Yes, I only use calendars/spreadsheets",
                "next_q_id": "Q5"
            },
            {
                "value": "NONE",
                "label": "No, I do not actively track time",
                "next_q_id": "Q5"
            }
        ]
    },
    {
        "id": "Q5",
        "text": "What is your main daily challenge regarding productivity?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "NOTIFICATIONS", "label": "Distractions from notifications and interruptions" },
            { "value": "PRIORITIZATION", "label": "Difficulty prioritizing (too many things to do)" },
            { "value": "MEETINGS", "label": "Excessive meetings and appointments" },
            { "value": "MULTITASKING", "label": "Tendency to multitask too much" }
        ],
        "next_q_id": "Q6"
    },
    {
        "id": "Q6",
        "text": "(Technical Question) Which time management methodology involves intense work blocks (e.g., 25 minutes) followed by short breaks?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "GTD", "label": "Getting Things Done (GTD)" },
            { "value": "POMODORO", "label": "Pomodoro Technique (Correct Answer)" },
            { "value": "KANBAN", "label": "Kanban Method" },
            { "value": "EISENHOWER", "label": "Eisenhower Matrix" }
        ],
        "next_q_id": "Q7"
    },
    {
        "id": "Q7",
        "text": "Which support format would you prefer to improve your productivity skills?",
        "type": "MULTIPLE_CHOICE",
        "options": [
            { "value": "VIDEO", "label": "Video tutorials or short online courses" },
            { "value": "EBOOK", "label": "E-books or in-depth written guides" },
            { "value": "CONSULTING", "label": "Direct individual consulting or coaching sessions" },
            { "value": "TOOL_SUGGESTIONS", "label": "Only suggestions on new software tools" }
        ],
        "next_q_id": "Q8"
    },

    {
        "id": "Q8",
        "text": "At what time of the day do you feel most energetic and productive (your Chronotype)?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "LARK", "label": "Early Morning (I wake up energetic)" },
            { "value": "THIRD_BIRD", "label": "Mid-Morning/Afternoon (Standard hours)" },
            { "value": "OWL", "label": "Evening/Night (I work best when others sleep)" }
        ],
        "next_q_id": "Q9"
    },
    {
        "id": "Q9",
        "text": "How long can you usually maintain 'Deep Work' (intense focus without distraction)?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "LOW", "label": "Less than 30 minutes" },
            { "value": "MED", "label": "30 to 60 minutes" },
            { "value": "HIGH", "label": "1 to 2 hours" },
            { "value": "VERY_HIGH", "label": "More than 2 hours" }
        ],
        "next_q_id": "Q10"
    },
    {
        "id": "Q10",
        "text": "Which Project Management tool do you currently use to organize tasks?",
        "type": "MULTIPLE_CHOICE",
        "options": [
            { "value": "NOTION", "label": "Notion / Obsidian (Knowledge Base style)" },
            { "value": "KANBAN_TOOLS", "label": "Trello / Jira / ClickUp" },
            { "value": "LIST_APPS", "label": "Todoist / Microsoft To Do / Apple Reminders" },
            { "value": "PAPER", "label": "Physical Notebook / Post-its" },
            { "value": "NONE", "label": "No specific system" }
        ],
        "next_q_id": "Q11"
    },
    {
        "id": "Q11",
        "text": "What is the primary trigger that causes you to procrastinate?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "PERFECTIONISM", "label": "Fear of not doing it perfectly" },
            { "value": "OVERWHELM", "label": "Task feels too big or complex" },
            { "value": "BOREDOM", "label": "Task is repetitive or uninteresting" },
            { "value": "FATIGUE", "label": "Lack of energy / burnout" }
        ],
        "next_q_id": "Q12"
    },
    {
        "id": "Q12",
        "text": "How do you handle emails and instant messages (Slack/Teams/WhatsApp)?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "REACTIVE", "label": "I respond immediately as they arrive" },
            { "value": "BATCHING", "label": "I check them only at set times (Batching)" },
            { "value": "IGNORE", "label": "I often forget to reply or reply very late" }
        ],
        "next_q_id": "Q13"
    },
    {
        "id": "Q13",
        "text": "Are you currently using AI tools (ChatGPT, Claude, Copilot) to speed up your workflow?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "HEAVY_USER", "label": "Yes, daily for many tasks" },
            { "value": "OCCASIONAL", "label": "Sometimes, for specific needs" },
            { "value": "RARELY", "label": "Rarely or I'm just experimenting" },
            { "value": "NO", "label": "No, I don't use AI tools" }
        ],
        "next_q_id": "Q14"
    },
    {
        "id": "Q14",
        "text": "How organized is your physical or digital workspace (files, desktop, desk)?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": 1, "label": "Chaotic / Messy" },
            { "value": 2, "label": "Disorganized" },
            { "value": 3, "label": "Average" },
            { "value": 4, "label": "Organized" },
            { "value": 5, "label": "Minimalist / Perfectly structured" }
        ],
        "next_q_id": "Q15"
    },
    {
        "id": "Q15",
        "text": "How difficult do you find it to say 'No' to new requests or tasks that aren't a priority?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "HARD", "label": "Very difficult, I often overcommit" },
            { "value": "DEPENDS", "label": "It depends on who is asking" },
            { "value": "EASY", "label": "Easy, I protect my time strictly" }
        ],
        "next_q_id": "Q16"
    },
    {
        "id": "Q16",
        "text": "Do you perform a 'Weekly Review' to plan the upcoming week?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "YES_CONSISTENT", "label": "Yes, every week consistently" },
            { "value": "YES_SPORADIC", "label": "Sometimes, but not regularly" },
            { "value": "NO", "label": "No, I plan day by day" }
        ],
        "next_q_id": "Q17"
    },
    {
        "id": "Q17",
        "text": "What is your approximate annual budget for productivity tools and self-improvement?",
        "type": "SINGLE_CHOICE",
        "options": [
            { "value": "ZERO", "label": "$0 (I only use free tools)" },
            { "value": "LOW", "label": "Under $100" },
            { "value": "MID", "label": "$100 - $500" },
            { "value": "HIGH", "label": "Over $500" }
        ],
        "next_q_id": "END_REPORT"
    }
];

export default function getQuestions(signal: AbortSignal) : Promise<object[]> {

    //Here we simulate an API call with a delay of 1 second
    return new Promise((resolve, reject) => {

        if (signal?.aborted) {
            reject(new DOMException("Aborted", "AbortError"));
            return;
        }

        const timeoutId = setTimeout(() => {
            resolve(MOCK_QUESTIONS);
        }, 100); 

        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timeoutId); 
                reject(new DOMException("Aborted", "AbortError"));
            });
        }
    });
}
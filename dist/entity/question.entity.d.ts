import { Question } from '@interfaces/question.interface';
export declare class QuestionEntity implements Question {
    qId: number;
    question: string;
    level: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

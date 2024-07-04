import { QuestionOption } from '@interfaces/questionOption.interface';
import { QuestionEntity } from './question.entity';
export declare class QuestionOptionEntity implements QuestionOption {
    question: QuestionEntity;
    oId: number;
    correctAnswer: string;
    options: string[];
    createdAt: Date;
    updatedAt: Date;
}

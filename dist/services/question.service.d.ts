import { Question } from '@/interfaces/question.interface';
import { QuestionOption } from '@/interfaces/questionOption.interface';
import { QuestionEntity } from '@entity/question.entity';
import { QuestionOptionEntity } from '@entity/questionOption.entity';
import { CreateQuestionDto } from '@/dtos/question.dto';
declare class QuestionService {
    question: typeof QuestionEntity;
    option: typeof QuestionOptionEntity;
    createQuestion(questionData: CreateQuestionDto): Promise<Question>;
    generateQuestion(): Promise<Question>;
    generateOptions(question: any): Promise<QuestionOption>;
    checkAnswer(answer: any): Promise<boolean>;
}
export default QuestionService;

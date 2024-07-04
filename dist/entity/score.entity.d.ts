import { Scores } from '@/interfaces/scores.interface';
import { UserEntity } from './users.entity';
export declare class ScoreEntity implements Scores {
    user: UserEntity;
    sid: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    setQuantity(): Promise<void>;
}

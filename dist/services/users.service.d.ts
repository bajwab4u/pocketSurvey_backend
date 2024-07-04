import { UserEntity } from '@entity/users.entity';
import { User } from '@interfaces/users.interface';
import { CreateUserDto } from '@/dtos/users.dto';
import { Scores } from '@/interfaces/scores.interface';
import { ScoreEntity } from '@/entity/score.entity';
declare class UserService {
    users: typeof UserEntity;
    scores: typeof ScoreEntity;
    findAllUser(): Promise<User[]>;
    findUserByMsisdn(msisdn: string): Promise<Scores>;
    createUserOnActivity(userData: CreateUserDto): Promise<User>;
    playGame(userData: CreateUserDto): Promise<Scores>;
}
export default UserService;
